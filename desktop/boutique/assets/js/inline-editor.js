/**
 * Reusable Inline Editor Module
 * Standardizes display-to-edit row transformations.
 */

const InlineEditor = {
    /**
     * Initialize a table for inline editing
     * @param {string} tableId 
     * @param {Object} options { saveUrl, onDelete, onSaveSuccess }
     */
    init(tableId, options) {
        this.table = document.getElementById(tableId);
        this.options = options;
        this.setupEventListeners();
    },

    setupEventListeners() {
        this.table.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-row-btn');
            const cancelBtn = e.target.closest('.cancel-edit-btn');
            const saveBtn = e.target.closest('.save-row-btn');
            const addBtn = e.target.closest('.add-child-btn');
            const deleteBtn = e.target.closest('.delete-row-btn');

            if (editBtn) this.enterEditMode(editBtn.closest('tr'));
            if (cancelBtn) this.cancelEdit(cancelBtn.closest('tr'));
            if (saveBtn) this.saveRow(saveBtn.closest('tr'));
            if (addBtn) this.addNewRow(addBtn.closest('tr'));
            if (deleteBtn) this.deleteRow(deleteBtn.closest('tr'));
        });
    },

    enterEditMode(row) {
        if (row.classList.contains('editing')) return;
        
        row.classList.add('editing');
        const cells = row.querySelectorAll('[data-field]');
        
        cells.forEach(cell => {
            const fieldName = cell.dataset.field;
            const fieldType = cell.dataset.fieldType || 'text';
            const fieldValue = cell.dataset.fieldValue || cell.innerText.trim();
            const options = cell.dataset.fieldOptions ? JSON.parse(cell.dataset.fieldOptions) : null;

            let input;
            const isSelect = fieldType === 'select' && options;
            if (isSelect) {
                input = document.createElement('select');
                input.className = 'form-select form-select-sm';
                options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.text = opt.label;
                    option.selected = opt.value == fieldValue;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
                input.type = fieldType;
                input.className = 'form-control form-control-sm';
                if (cell.classList.contains('text-end')) input.classList.add('text-end');
                input.value = fieldValue;
            }
            
            input.name = fieldName;
            cell.dataset.originalContent = cell.innerHTML;
            
            // Preserve toggle icon and folder icon for name field
            const icons = Array.from(cell.querySelectorAll('.toggle-icon, i'));
            cell.innerHTML = '';
            
            if (icons.length > 0) {
                const wrapper = document.createElement('div');
                wrapper.className = 'd-flex align-items-center gap-1';
                icons.forEach(icon => wrapper.appendChild(icon));
                input.style.flex = '1';
                wrapper.appendChild(input);
                cell.appendChild(wrapper);
            } else {
                cell.appendChild(input);
            }

            // Prevent table-level click events from interfering with the input
            input.addEventListener('click', (e) => e.stopPropagation());
        });

        // Focus the first input
        const firstInput = row.querySelector('input, select');
        if (firstInput) firstInput.focus();

        this.toggleActions(row, true);
    },

    cancelEdit(row) {
        if (row.classList.contains('new-row')) {
            row.remove();
            return;
        }

        row.classList.remove('editing');
        const cells = row.querySelectorAll('[data-field]');
        cells.forEach(cell => {
            cell.innerHTML = cell.dataset.originalContent;
        });
        this.toggleActions(row, false);
    },

    async saveRow(row) {
        const inputs = row.querySelectorAll('input, select');
        const data = { id: row.dataset.id };
        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        // Maintain parent ID
        const parentId = row.dataset.parentId;
        if (parentId && parentId !== 'null' && parentId !== 'undefined') {
            data.fk_parent_in_financeaccount = parentId;
        }

        const saveBtn = row.querySelector('.save-row-btn');
        const originalText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';

        try {
            const response = await fetch(this.options.saveUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.success) {
                if (typeof toastr !== 'undefined') toastr.success(result.message);
                if (this.options.onSaveSuccess) {
                    this.options.onSaveSuccess(result, row);
                } else {
                    location.reload();
                }
            } else {
                if (typeof toastr !== 'undefined') toastr.error(result.message);
                saveBtn.disabled = false;
                saveBtn.innerHTML = originalText;
            }
        } catch (error) {
            console.error('Save error:', error);
            if (typeof toastr !== 'undefined') toastr.error('Failed to save record');
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalText;
        }
    },

    async deleteRow(row) {
        const id = row.dataset.id;
        if (!id) return;

        if (!confirm('Are you sure you want to delete this account head?')) return;

        const deleteUrl = this.options.deleteUrl ? this.options.deleteUrl.replace(':id', id) : `/accounting/coa/${id}/delete`;

        try {
            const response = await fetch(deleteUrl, { method: 'POST' });
            const result = await response.json();
            if (result.success) {
                if (typeof toastr !== 'undefined') toastr.success(result.message);
                row.remove();
            } else {
                if (typeof toastr !== 'undefined') toastr.error(result.message);
            }
        } catch (error) {
            if (typeof toastr !== 'undefined') toastr.error('Failed to delete account');
        }
    },

    addNewRow(parentRow) {
        const parentId = parentRow ? parentRow.dataset.id : null;
        const parentCode = parentRow ? parentRow.querySelector('[data-field="code"]').dataset.fieldValue : '';
        const level = parentRow ? parseInt(parentRow.dataset.level) + 1 : 0;
        
        const template = document.querySelector('.row-template');
        if (!template) return;

        const newRow = template.cloneNode(true);
        newRow.classList.remove('row-template', 'd-none');
        newRow.classList.add('new-row', `level-${level}`);
        newRow.dataset.parentId = parentId;
        newRow.dataset.level = level;
        
        // Suggest next code
        let nextCode = this.suggestNextCode(parentRow, parentCode);
        const codeCell = newRow.querySelector('[data-field="code"]');
        if (codeCell) codeCell.dataset.fieldValue = nextCode;

        // Copy parent's category
        if (parentRow) {
            const parentCat = parentRow.querySelector('[data-field="category"]').dataset.fieldValue;
            const catCell = newRow.querySelector('[data-field="category"]');
            if (catCell) catCell.dataset.fieldValue = parentCat;

            const parentBalType = parentRow.querySelector('[data-field="balance_type"]').dataset.fieldValue;
            const balCell = newRow.querySelector('[data-field="balance_type"]');
            if (balCell) balCell.dataset.fieldValue = parentBalType;
        }

        // Indent
        const nameCell = newRow.querySelector('[data-field="name"]');
        if (nameCell) nameCell.style.paddingLeft = (level * 20) + 'px';

        // Insert after parent and all its existing children
        let insertAfter = parentRow;
        if (parentRow) {
            let nextRow = parentRow.nextElementSibling;
            while (nextRow && parseInt(nextRow.dataset.level) > parseInt(parentRow.dataset.level)) {
                insertAfter = nextRow;
                nextRow = nextRow.nextElementSibling;
            }
        }

        if (insertAfter) {
            insertAfter.after(newRow);
            // Ensure parent is expanded
            const icon = parentRow?.querySelector('.toggle-icon');
            if (icon && !icon.classList.contains('expanded') && typeof toggleRow === 'function') {
                toggleRow(icon);
            }
        } else {
            this.table.querySelector('tbody').appendChild(newRow);
        }

        this.enterEditMode(newRow);
    },

    suggestNextCode(parentRow, parentCode) {
        if (!parentRow) return '';
        
        const children = Array.from(this.table.querySelectorAll(`[data-parent-id="${parentRow.dataset.id}"]`));
        if (children.length === 0) {
            // Suggest appending '1' or '01'
            return parentCode.endsWith('0') ? parentCode.slice(0, -1) + '1' : parentCode + '1';
        }

        // Get last child's code and increment
        const lastChildCode = children[children.length - 1].querySelector('[data-field="code"]').dataset.fieldValue;
        const codeNum = parseInt(lastChildCode);
        if (!isNaN(codeNum)) {
            return (codeNum + 1).toString();
        }
        return parentCode + (children.length + 1);
    },

    toggleActions(row, isEditing) {
        const displayActions = row.querySelector('.display-actions');
        const editActions = row.querySelector('.edit-actions');
        if (displayActions) displayActions.classList.toggle('d-none', isEditing);
        if (editActions) editActions.classList.toggle('d-none', !isEditing);
    }
};

window.InlineEditor = InlineEditor;
