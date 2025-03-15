#install location will be
C:\Users\IT LAND\AppData\Local\Programs\openmenu (contain the software files and db)
C:\Users\IT LAND\AppData\Local\openmenu-updater (will contain the updater)
C:\Users\IT LAND\AppData\Roaming\openmenu (userData folter, App folter contain the logs and other cache files)


#Deploy the package
change version in package.json "version": "1.0.0"
building the project
`npm run build`
`npm run upload` (it will upload the new build on https://gitlab.com/api/v4/projects/62990895/packages/generic/openmenu/release)
we need to delete the files from https://gitlab.com/atta_devgiant/openmenu/-/packages until we successfully test the update, after the deploy anywhere and user getting updates then we will do not need to delete
Important Note a single file cannot be uploaded to (https://gitlab.com/api/v4/projects/' + process.env.CI_PROJECT_ID + '/packages/generic/openmenu), it should be some folder


#Different Data sync logics
1. Upload complete sqlite db
2. Make ids string locally and online (possibility will of duplicate)
3. With int ids remove relationships
4. Make one ways directions like products can be only online created, sales only can be done locally
5. Start local ids from specific big number e.g(100000000)