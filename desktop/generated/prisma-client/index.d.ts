
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SequelizeMeta
 * 
 */
export type SequelizeMeta = $Result.DefaultSelection<Prisma.$SequelizeMetaPayload>
/**
 * Model brand
 * 
 */
export type brand = $Result.DefaultSelection<Prisma.$brandPayload>
/**
 * Model cashclosing
 * 
 */
export type cashclosing = $Result.DefaultSelection<Prisma.$cashclosingPayload>
/**
 * Model category
 * 
 */
export type category = $Result.DefaultSelection<Prisma.$categoryPayload>
/**
 * Model financeaccount
 * 
 */
export type financeaccount = $Result.DefaultSelection<Prisma.$financeaccountPayload>
/**
 * Model financetransaction
 * 
 */
export type financetransaction = $Result.DefaultSelection<Prisma.$financetransactionPayload>
/**
 * Model inventorylogs
 * 
 */
export type inventorylogs = $Result.DefaultSelection<Prisma.$inventorylogsPayload>
/**
 * Model product
 * 
 */
export type product = $Result.DefaultSelection<Prisma.$productPayload>
/**
 * Model productbatches
 * 
 */
export type productbatches = $Result.DefaultSelection<Prisma.$productbatchesPayload>
/**
 * Model productsalepurchase
 * 
 */
export type productsalepurchase = $Result.DefaultSelection<Prisma.$productsalepurchasePayload>
/**
 * Model productsub
 * 
 */
export type productsub = $Result.DefaultSelection<Prisma.$productsubPayload>
/**
 * Model purchase
 * 
 */
export type purchase = $Result.DefaultSelection<Prisma.$purchasePayload>
/**
 * Model purchasedproducts
 * 
 */
export type purchasedproducts = $Result.DefaultSelection<Prisma.$purchasedproductsPayload>
/**
 * Model sale
 * 
 */
export type sale = $Result.DefaultSelection<Prisma.$salePayload>
/**
 * Model softwaresetting
 * 
 */
export type softwaresetting = $Result.DefaultSelection<Prisma.$softwaresettingPayload>
/**
 * Model soldproducts
 * 
 */
export type soldproducts = $Result.DefaultSelection<Prisma.$soldproductsPayload>
/**
 * Model taxes
 * 
 */
export type taxes = $Result.DefaultSelection<Prisma.$taxesPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more SequelizeMetas
 * const sequelizeMetas = await prisma.sequelizeMeta.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more SequelizeMetas
   * const sequelizeMetas = await prisma.sequelizeMeta.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.sequelizeMeta`: Exposes CRUD operations for the **SequelizeMeta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SequelizeMetas
    * const sequelizeMetas = await prisma.sequelizeMeta.findMany()
    * ```
    */
  get sequelizeMeta(): Prisma.SequelizeMetaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.brandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cashclosing`: Exposes CRUD operations for the **cashclosing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cashclosings
    * const cashclosings = await prisma.cashclosing.findMany()
    * ```
    */
  get cashclosing(): Prisma.cashclosingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financeaccount`: Exposes CRUD operations for the **financeaccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Financeaccounts
    * const financeaccounts = await prisma.financeaccount.findMany()
    * ```
    */
  get financeaccount(): Prisma.financeaccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financetransaction`: Exposes CRUD operations for the **financetransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Financetransactions
    * const financetransactions = await prisma.financetransaction.findMany()
    * ```
    */
  get financetransaction(): Prisma.financetransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inventorylogs`: Exposes CRUD operations for the **inventorylogs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inventorylogs
    * const inventorylogs = await prisma.inventorylogs.findMany()
    * ```
    */
  get inventorylogs(): Prisma.inventorylogsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.productDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productbatches`: Exposes CRUD operations for the **productbatches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productbatches
    * const productbatches = await prisma.productbatches.findMany()
    * ```
    */
  get productbatches(): Prisma.productbatchesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productsalepurchase`: Exposes CRUD operations for the **productsalepurchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productsalepurchases
    * const productsalepurchases = await prisma.productsalepurchase.findMany()
    * ```
    */
  get productsalepurchase(): Prisma.productsalepurchaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productsub`: Exposes CRUD operations for the **productsub** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productsubs
    * const productsubs = await prisma.productsub.findMany()
    * ```
    */
  get productsub(): Prisma.productsubDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.purchase`: Exposes CRUD operations for the **purchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchase.findMany()
    * ```
    */
  get purchase(): Prisma.purchaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.purchasedproducts`: Exposes CRUD operations for the **purchasedproducts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchasedproducts
    * const purchasedproducts = await prisma.purchasedproducts.findMany()
    * ```
    */
  get purchasedproducts(): Prisma.purchasedproductsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.saleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.softwaresetting`: Exposes CRUD operations for the **softwaresetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Softwaresettings
    * const softwaresettings = await prisma.softwaresetting.findMany()
    * ```
    */
  get softwaresetting(): Prisma.softwaresettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.soldproducts`: Exposes CRUD operations for the **soldproducts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Soldproducts
    * const soldproducts = await prisma.soldproducts.findMany()
    * ```
    */
  get soldproducts(): Prisma.soldproductsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taxes`: Exposes CRUD operations for the **taxes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Taxes
    * const taxes = await prisma.taxes.findMany()
    * ```
    */
  get taxes(): Prisma.taxesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SequelizeMeta: 'SequelizeMeta',
    brand: 'brand',
    cashclosing: 'cashclosing',
    category: 'category',
    financeaccount: 'financeaccount',
    financetransaction: 'financetransaction',
    inventorylogs: 'inventorylogs',
    product: 'product',
    productbatches: 'productbatches',
    productsalepurchase: 'productsalepurchase',
    productsub: 'productsub',
    purchase: 'purchase',
    purchasedproducts: 'purchasedproducts',
    sale: 'sale',
    softwaresetting: 'softwaresetting',
    soldproducts: 'soldproducts',
    taxes: 'taxes',
    user: 'user'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "sequelizeMeta" | "brand" | "cashclosing" | "category" | "financeaccount" | "financetransaction" | "inventorylogs" | "product" | "productbatches" | "productsalepurchase" | "productsub" | "purchase" | "purchasedproducts" | "sale" | "softwaresetting" | "soldproducts" | "taxes" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SequelizeMeta: {
        payload: Prisma.$SequelizeMetaPayload<ExtArgs>
        fields: Prisma.SequelizeMetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SequelizeMetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SequelizeMetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>
          }
          findFirst: {
            args: Prisma.SequelizeMetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SequelizeMetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>
          }
          findMany: {
            args: Prisma.SequelizeMetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>[]
          }
          create: {
            args: Prisma.SequelizeMetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>
          }
          createMany: {
            args: Prisma.SequelizeMetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SequelizeMetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>[]
          }
          delete: {
            args: Prisma.SequelizeMetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>
          }
          update: {
            args: Prisma.SequelizeMetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>
          }
          deleteMany: {
            args: Prisma.SequelizeMetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SequelizeMetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SequelizeMetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>[]
          }
          upsert: {
            args: Prisma.SequelizeMetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequelizeMetaPayload>
          }
          aggregate: {
            args: Prisma.SequelizeMetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSequelizeMeta>
          }
          groupBy: {
            args: Prisma.SequelizeMetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SequelizeMetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SequelizeMetaCountArgs<ExtArgs>
            result: $Utils.Optional<SequelizeMetaCountAggregateOutputType> | number
          }
        }
      }
      brand: {
        payload: Prisma.$brandPayload<ExtArgs>
        fields: Prisma.brandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.brandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.brandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>
          }
          findFirst: {
            args: Prisma.brandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.brandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>
          }
          findMany: {
            args: Prisma.brandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>[]
          }
          create: {
            args: Prisma.brandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>
          }
          createMany: {
            args: Prisma.brandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.brandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>[]
          }
          delete: {
            args: Prisma.brandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>
          }
          update: {
            args: Prisma.brandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>
          }
          deleteMany: {
            args: Prisma.brandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.brandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.brandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>[]
          }
          upsert: {
            args: Prisma.brandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$brandPayload>
          }
          aggregate: {
            args: Prisma.BrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrand>
          }
          groupBy: {
            args: Prisma.brandGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.brandCountArgs<ExtArgs>
            result: $Utils.Optional<BrandCountAggregateOutputType> | number
          }
        }
      }
      cashclosing: {
        payload: Prisma.$cashclosingPayload<ExtArgs>
        fields: Prisma.cashclosingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cashclosingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cashclosingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>
          }
          findFirst: {
            args: Prisma.cashclosingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cashclosingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>
          }
          findMany: {
            args: Prisma.cashclosingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>[]
          }
          create: {
            args: Prisma.cashclosingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>
          }
          createMany: {
            args: Prisma.cashclosingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cashclosingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>[]
          }
          delete: {
            args: Prisma.cashclosingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>
          }
          update: {
            args: Prisma.cashclosingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>
          }
          deleteMany: {
            args: Prisma.cashclosingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cashclosingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cashclosingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>[]
          }
          upsert: {
            args: Prisma.cashclosingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cashclosingPayload>
          }
          aggregate: {
            args: Prisma.CashclosingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCashclosing>
          }
          groupBy: {
            args: Prisma.cashclosingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CashclosingGroupByOutputType>[]
          }
          count: {
            args: Prisma.cashclosingCountArgs<ExtArgs>
            result: $Utils.Optional<CashclosingCountAggregateOutputType> | number
          }
        }
      }
      category: {
        payload: Prisma.$categoryPayload<ExtArgs>
        fields: Prisma.categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findFirst: {
            args: Prisma.categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findMany: {
            args: Prisma.categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          create: {
            args: Prisma.categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          createMany: {
            args: Prisma.categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          delete: {
            args: Prisma.categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          update: {
            args: Prisma.categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          deleteMany: {
            args: Prisma.categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          upsert: {
            args: Prisma.categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      financeaccount: {
        payload: Prisma.$financeaccountPayload<ExtArgs>
        fields: Prisma.financeaccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.financeaccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.financeaccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>
          }
          findFirst: {
            args: Prisma.financeaccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.financeaccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>
          }
          findMany: {
            args: Prisma.financeaccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>[]
          }
          create: {
            args: Prisma.financeaccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>
          }
          createMany: {
            args: Prisma.financeaccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.financeaccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>[]
          }
          delete: {
            args: Prisma.financeaccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>
          }
          update: {
            args: Prisma.financeaccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>
          }
          deleteMany: {
            args: Prisma.financeaccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.financeaccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.financeaccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>[]
          }
          upsert: {
            args: Prisma.financeaccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financeaccountPayload>
          }
          aggregate: {
            args: Prisma.FinanceaccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinanceaccount>
          }
          groupBy: {
            args: Prisma.financeaccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinanceaccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.financeaccountCountArgs<ExtArgs>
            result: $Utils.Optional<FinanceaccountCountAggregateOutputType> | number
          }
        }
      }
      financetransaction: {
        payload: Prisma.$financetransactionPayload<ExtArgs>
        fields: Prisma.financetransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.financetransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.financetransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>
          }
          findFirst: {
            args: Prisma.financetransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.financetransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>
          }
          findMany: {
            args: Prisma.financetransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>[]
          }
          create: {
            args: Prisma.financetransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>
          }
          createMany: {
            args: Prisma.financetransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.financetransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>[]
          }
          delete: {
            args: Prisma.financetransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>
          }
          update: {
            args: Prisma.financetransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>
          }
          deleteMany: {
            args: Prisma.financetransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.financetransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.financetransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>[]
          }
          upsert: {
            args: Prisma.financetransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$financetransactionPayload>
          }
          aggregate: {
            args: Prisma.FinancetransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinancetransaction>
          }
          groupBy: {
            args: Prisma.financetransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinancetransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.financetransactionCountArgs<ExtArgs>
            result: $Utils.Optional<FinancetransactionCountAggregateOutputType> | number
          }
        }
      }
      inventorylogs: {
        payload: Prisma.$inventorylogsPayload<ExtArgs>
        fields: Prisma.inventorylogsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.inventorylogsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.inventorylogsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>
          }
          findFirst: {
            args: Prisma.inventorylogsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.inventorylogsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>
          }
          findMany: {
            args: Prisma.inventorylogsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>[]
          }
          create: {
            args: Prisma.inventorylogsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>
          }
          createMany: {
            args: Prisma.inventorylogsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.inventorylogsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>[]
          }
          delete: {
            args: Prisma.inventorylogsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>
          }
          update: {
            args: Prisma.inventorylogsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>
          }
          deleteMany: {
            args: Prisma.inventorylogsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.inventorylogsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.inventorylogsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>[]
          }
          upsert: {
            args: Prisma.inventorylogsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventorylogsPayload>
          }
          aggregate: {
            args: Prisma.InventorylogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventorylogs>
          }
          groupBy: {
            args: Prisma.inventorylogsGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventorylogsGroupByOutputType>[]
          }
          count: {
            args: Prisma.inventorylogsCountArgs<ExtArgs>
            result: $Utils.Optional<InventorylogsCountAggregateOutputType> | number
          }
        }
      }
      product: {
        payload: Prisma.$productPayload<ExtArgs>
        fields: Prisma.productFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          findFirst: {
            args: Prisma.productFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          findMany: {
            args: Prisma.productFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>[]
          }
          create: {
            args: Prisma.productCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          createMany: {
            args: Prisma.productCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>[]
          }
          delete: {
            args: Prisma.productDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          update: {
            args: Prisma.productUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          deleteMany: {
            args: Prisma.productDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>[]
          }
          upsert: {
            args: Prisma.productUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.productGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.productCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      productbatches: {
        payload: Prisma.$productbatchesPayload<ExtArgs>
        fields: Prisma.productbatchesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productbatchesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productbatchesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>
          }
          findFirst: {
            args: Prisma.productbatchesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productbatchesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>
          }
          findMany: {
            args: Prisma.productbatchesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>[]
          }
          create: {
            args: Prisma.productbatchesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>
          }
          createMany: {
            args: Prisma.productbatchesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productbatchesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>[]
          }
          delete: {
            args: Prisma.productbatchesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>
          }
          update: {
            args: Prisma.productbatchesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>
          }
          deleteMany: {
            args: Prisma.productbatchesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productbatchesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productbatchesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>[]
          }
          upsert: {
            args: Prisma.productbatchesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productbatchesPayload>
          }
          aggregate: {
            args: Prisma.ProductbatchesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductbatches>
          }
          groupBy: {
            args: Prisma.productbatchesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductbatchesGroupByOutputType>[]
          }
          count: {
            args: Prisma.productbatchesCountArgs<ExtArgs>
            result: $Utils.Optional<ProductbatchesCountAggregateOutputType> | number
          }
        }
      }
      productsalepurchase: {
        payload: Prisma.$productsalepurchasePayload<ExtArgs>
        fields: Prisma.productsalepurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productsalepurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productsalepurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>
          }
          findFirst: {
            args: Prisma.productsalepurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productsalepurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>
          }
          findMany: {
            args: Prisma.productsalepurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>[]
          }
          create: {
            args: Prisma.productsalepurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>
          }
          createMany: {
            args: Prisma.productsalepurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productsalepurchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>[]
          }
          delete: {
            args: Prisma.productsalepurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>
          }
          update: {
            args: Prisma.productsalepurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>
          }
          deleteMany: {
            args: Prisma.productsalepurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productsalepurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productsalepurchaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>[]
          }
          upsert: {
            args: Prisma.productsalepurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsalepurchasePayload>
          }
          aggregate: {
            args: Prisma.ProductsalepurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductsalepurchase>
          }
          groupBy: {
            args: Prisma.productsalepurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductsalepurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.productsalepurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<ProductsalepurchaseCountAggregateOutputType> | number
          }
        }
      }
      productsub: {
        payload: Prisma.$productsubPayload<ExtArgs>
        fields: Prisma.productsubFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productsubFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productsubFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>
          }
          findFirst: {
            args: Prisma.productsubFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productsubFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>
          }
          findMany: {
            args: Prisma.productsubFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>[]
          }
          create: {
            args: Prisma.productsubCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>
          }
          createMany: {
            args: Prisma.productsubCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productsubCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>[]
          }
          delete: {
            args: Prisma.productsubDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>
          }
          update: {
            args: Prisma.productsubUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>
          }
          deleteMany: {
            args: Prisma.productsubDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productsubUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productsubUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>[]
          }
          upsert: {
            args: Prisma.productsubUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsubPayload>
          }
          aggregate: {
            args: Prisma.ProductsubAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductsub>
          }
          groupBy: {
            args: Prisma.productsubGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductsubGroupByOutputType>[]
          }
          count: {
            args: Prisma.productsubCountArgs<ExtArgs>
            result: $Utils.Optional<ProductsubCountAggregateOutputType> | number
          }
        }
      }
      purchase: {
        payload: Prisma.$purchasePayload<ExtArgs>
        fields: Prisma.purchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.purchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.purchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>
          }
          findFirst: {
            args: Prisma.purchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.purchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>
          }
          findMany: {
            args: Prisma.purchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>[]
          }
          create: {
            args: Prisma.purchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>
          }
          createMany: {
            args: Prisma.purchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.purchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>[]
          }
          delete: {
            args: Prisma.purchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>
          }
          update: {
            args: Prisma.purchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>
          }
          deleteMany: {
            args: Prisma.purchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.purchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.purchaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>[]
          }
          upsert: {
            args: Prisma.purchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasePayload>
          }
          aggregate: {
            args: Prisma.PurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchase>
          }
          groupBy: {
            args: Prisma.purchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.purchaseCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseCountAggregateOutputType> | number
          }
        }
      }
      purchasedproducts: {
        payload: Prisma.$purchasedproductsPayload<ExtArgs>
        fields: Prisma.purchasedproductsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.purchasedproductsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.purchasedproductsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>
          }
          findFirst: {
            args: Prisma.purchasedproductsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.purchasedproductsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>
          }
          findMany: {
            args: Prisma.purchasedproductsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>[]
          }
          create: {
            args: Prisma.purchasedproductsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>
          }
          createMany: {
            args: Prisma.purchasedproductsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.purchasedproductsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>[]
          }
          delete: {
            args: Prisma.purchasedproductsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>
          }
          update: {
            args: Prisma.purchasedproductsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>
          }
          deleteMany: {
            args: Prisma.purchasedproductsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.purchasedproductsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.purchasedproductsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>[]
          }
          upsert: {
            args: Prisma.purchasedproductsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasedproductsPayload>
          }
          aggregate: {
            args: Prisma.PurchasedproductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchasedproducts>
          }
          groupBy: {
            args: Prisma.purchasedproductsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchasedproductsGroupByOutputType>[]
          }
          count: {
            args: Prisma.purchasedproductsCountArgs<ExtArgs>
            result: $Utils.Optional<PurchasedproductsCountAggregateOutputType> | number
          }
        }
      }
      sale: {
        payload: Prisma.$salePayload<ExtArgs>
        fields: Prisma.saleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.saleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.saleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>
          }
          findFirst: {
            args: Prisma.saleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.saleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>
          }
          findMany: {
            args: Prisma.saleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>[]
          }
          create: {
            args: Prisma.saleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>
          }
          createMany: {
            args: Prisma.saleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.saleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>[]
          }
          delete: {
            args: Prisma.saleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>
          }
          update: {
            args: Prisma.saleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>
          }
          deleteMany: {
            args: Prisma.saleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.saleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.saleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>[]
          }
          upsert: {
            args: Prisma.saleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$salePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.saleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.saleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      softwaresetting: {
        payload: Prisma.$softwaresettingPayload<ExtArgs>
        fields: Prisma.softwaresettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.softwaresettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.softwaresettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>
          }
          findFirst: {
            args: Prisma.softwaresettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.softwaresettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>
          }
          findMany: {
            args: Prisma.softwaresettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>[]
          }
          create: {
            args: Prisma.softwaresettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>
          }
          createMany: {
            args: Prisma.softwaresettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.softwaresettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>[]
          }
          delete: {
            args: Prisma.softwaresettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>
          }
          update: {
            args: Prisma.softwaresettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>
          }
          deleteMany: {
            args: Prisma.softwaresettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.softwaresettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.softwaresettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>[]
          }
          upsert: {
            args: Prisma.softwaresettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$softwaresettingPayload>
          }
          aggregate: {
            args: Prisma.SoftwaresettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoftwaresetting>
          }
          groupBy: {
            args: Prisma.softwaresettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoftwaresettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.softwaresettingCountArgs<ExtArgs>
            result: $Utils.Optional<SoftwaresettingCountAggregateOutputType> | number
          }
        }
      }
      soldproducts: {
        payload: Prisma.$soldproductsPayload<ExtArgs>
        fields: Prisma.soldproductsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.soldproductsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.soldproductsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>
          }
          findFirst: {
            args: Prisma.soldproductsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.soldproductsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>
          }
          findMany: {
            args: Prisma.soldproductsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>[]
          }
          create: {
            args: Prisma.soldproductsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>
          }
          createMany: {
            args: Prisma.soldproductsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.soldproductsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>[]
          }
          delete: {
            args: Prisma.soldproductsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>
          }
          update: {
            args: Prisma.soldproductsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>
          }
          deleteMany: {
            args: Prisma.soldproductsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.soldproductsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.soldproductsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>[]
          }
          upsert: {
            args: Prisma.soldproductsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldproductsPayload>
          }
          aggregate: {
            args: Prisma.SoldproductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoldproducts>
          }
          groupBy: {
            args: Prisma.soldproductsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoldproductsGroupByOutputType>[]
          }
          count: {
            args: Prisma.soldproductsCountArgs<ExtArgs>
            result: $Utils.Optional<SoldproductsCountAggregateOutputType> | number
          }
        }
      }
      taxes: {
        payload: Prisma.$taxesPayload<ExtArgs>
        fields: Prisma.taxesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.taxesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.taxesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>
          }
          findFirst: {
            args: Prisma.taxesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.taxesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>
          }
          findMany: {
            args: Prisma.taxesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>[]
          }
          create: {
            args: Prisma.taxesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>
          }
          createMany: {
            args: Prisma.taxesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.taxesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>[]
          }
          delete: {
            args: Prisma.taxesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>
          }
          update: {
            args: Prisma.taxesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>
          }
          deleteMany: {
            args: Prisma.taxesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.taxesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.taxesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>[]
          }
          upsert: {
            args: Prisma.taxesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taxesPayload>
          }
          aggregate: {
            args: Prisma.TaxesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaxes>
          }
          groupBy: {
            args: Prisma.taxesGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaxesGroupByOutputType>[]
          }
          count: {
            args: Prisma.taxesCountArgs<ExtArgs>
            result: $Utils.Optional<TaxesCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    sequelizeMeta?: SequelizeMetaOmit
    brand?: brandOmit
    cashclosing?: cashclosingOmit
    category?: categoryOmit
    financeaccount?: financeaccountOmit
    financetransaction?: financetransactionOmit
    inventorylogs?: inventorylogsOmit
    product?: productOmit
    productbatches?: productbatchesOmit
    productsalepurchase?: productsalepurchaseOmit
    productsub?: productsubOmit
    purchase?: purchaseOmit
    purchasedproducts?: purchasedproductsOmit
    sale?: saleOmit
    softwaresetting?: softwaresettingOmit
    soldproducts?: soldproductsOmit
    taxes?: taxesOmit
    user?: userOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SequelizeMeta
   */

  export type AggregateSequelizeMeta = {
    _count: SequelizeMetaCountAggregateOutputType | null
    _min: SequelizeMetaMinAggregateOutputType | null
    _max: SequelizeMetaMaxAggregateOutputType | null
  }

  export type SequelizeMetaMinAggregateOutputType = {
    name: string | null
  }

  export type SequelizeMetaMaxAggregateOutputType = {
    name: string | null
  }

  export type SequelizeMetaCountAggregateOutputType = {
    name: number
    _all: number
  }


  export type SequelizeMetaMinAggregateInputType = {
    name?: true
  }

  export type SequelizeMetaMaxAggregateInputType = {
    name?: true
  }

  export type SequelizeMetaCountAggregateInputType = {
    name?: true
    _all?: true
  }

  export type SequelizeMetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SequelizeMeta to aggregate.
     */
    where?: SequelizeMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SequelizeMetas to fetch.
     */
    orderBy?: SequelizeMetaOrderByWithRelationInput | SequelizeMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SequelizeMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SequelizeMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SequelizeMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SequelizeMetas
    **/
    _count?: true | SequelizeMetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SequelizeMetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SequelizeMetaMaxAggregateInputType
  }

  export type GetSequelizeMetaAggregateType<T extends SequelizeMetaAggregateArgs> = {
        [P in keyof T & keyof AggregateSequelizeMeta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSequelizeMeta[P]>
      : GetScalarType<T[P], AggregateSequelizeMeta[P]>
  }




  export type SequelizeMetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SequelizeMetaWhereInput
    orderBy?: SequelizeMetaOrderByWithAggregationInput | SequelizeMetaOrderByWithAggregationInput[]
    by: SequelizeMetaScalarFieldEnum[] | SequelizeMetaScalarFieldEnum
    having?: SequelizeMetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SequelizeMetaCountAggregateInputType | true
    _min?: SequelizeMetaMinAggregateInputType
    _max?: SequelizeMetaMaxAggregateInputType
  }

  export type SequelizeMetaGroupByOutputType = {
    name: string
    _count: SequelizeMetaCountAggregateOutputType | null
    _min: SequelizeMetaMinAggregateOutputType | null
    _max: SequelizeMetaMaxAggregateOutputType | null
  }

  type GetSequelizeMetaGroupByPayload<T extends SequelizeMetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SequelizeMetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SequelizeMetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SequelizeMetaGroupByOutputType[P]>
            : GetScalarType<T[P], SequelizeMetaGroupByOutputType[P]>
        }
      >
    >


  export type SequelizeMetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
  }, ExtArgs["result"]["sequelizeMeta"]>

  export type SequelizeMetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
  }, ExtArgs["result"]["sequelizeMeta"]>

  export type SequelizeMetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
  }, ExtArgs["result"]["sequelizeMeta"]>

  export type SequelizeMetaSelectScalar = {
    name?: boolean
  }

  export type SequelizeMetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name", ExtArgs["result"]["sequelizeMeta"]>

  export type $SequelizeMetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SequelizeMeta"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      name: string
    }, ExtArgs["result"]["sequelizeMeta"]>
    composites: {}
  }

  type SequelizeMetaGetPayload<S extends boolean | null | undefined | SequelizeMetaDefaultArgs> = $Result.GetResult<Prisma.$SequelizeMetaPayload, S>

  type SequelizeMetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SequelizeMetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SequelizeMetaCountAggregateInputType | true
    }

  export interface SequelizeMetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SequelizeMeta'], meta: { name: 'SequelizeMeta' } }
    /**
     * Find zero or one SequelizeMeta that matches the filter.
     * @param {SequelizeMetaFindUniqueArgs} args - Arguments to find a SequelizeMeta
     * @example
     * // Get one SequelizeMeta
     * const sequelizeMeta = await prisma.sequelizeMeta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SequelizeMetaFindUniqueArgs>(args: SelectSubset<T, SequelizeMetaFindUniqueArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SequelizeMeta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SequelizeMetaFindUniqueOrThrowArgs} args - Arguments to find a SequelizeMeta
     * @example
     * // Get one SequelizeMeta
     * const sequelizeMeta = await prisma.sequelizeMeta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SequelizeMetaFindUniqueOrThrowArgs>(args: SelectSubset<T, SequelizeMetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SequelizeMeta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaFindFirstArgs} args - Arguments to find a SequelizeMeta
     * @example
     * // Get one SequelizeMeta
     * const sequelizeMeta = await prisma.sequelizeMeta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SequelizeMetaFindFirstArgs>(args?: SelectSubset<T, SequelizeMetaFindFirstArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SequelizeMeta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaFindFirstOrThrowArgs} args - Arguments to find a SequelizeMeta
     * @example
     * // Get one SequelizeMeta
     * const sequelizeMeta = await prisma.sequelizeMeta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SequelizeMetaFindFirstOrThrowArgs>(args?: SelectSubset<T, SequelizeMetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SequelizeMetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SequelizeMetas
     * const sequelizeMetas = await prisma.sequelizeMeta.findMany()
     * 
     * // Get first 10 SequelizeMetas
     * const sequelizeMetas = await prisma.sequelizeMeta.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const sequelizeMetaWithNameOnly = await prisma.sequelizeMeta.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends SequelizeMetaFindManyArgs>(args?: SelectSubset<T, SequelizeMetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SequelizeMeta.
     * @param {SequelizeMetaCreateArgs} args - Arguments to create a SequelizeMeta.
     * @example
     * // Create one SequelizeMeta
     * const SequelizeMeta = await prisma.sequelizeMeta.create({
     *   data: {
     *     // ... data to create a SequelizeMeta
     *   }
     * })
     * 
     */
    create<T extends SequelizeMetaCreateArgs>(args: SelectSubset<T, SequelizeMetaCreateArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SequelizeMetas.
     * @param {SequelizeMetaCreateManyArgs} args - Arguments to create many SequelizeMetas.
     * @example
     * // Create many SequelizeMetas
     * const sequelizeMeta = await prisma.sequelizeMeta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SequelizeMetaCreateManyArgs>(args?: SelectSubset<T, SequelizeMetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SequelizeMetas and returns the data saved in the database.
     * @param {SequelizeMetaCreateManyAndReturnArgs} args - Arguments to create many SequelizeMetas.
     * @example
     * // Create many SequelizeMetas
     * const sequelizeMeta = await prisma.sequelizeMeta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SequelizeMetas and only return the `name`
     * const sequelizeMetaWithNameOnly = await prisma.sequelizeMeta.createManyAndReturn({
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SequelizeMetaCreateManyAndReturnArgs>(args?: SelectSubset<T, SequelizeMetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SequelizeMeta.
     * @param {SequelizeMetaDeleteArgs} args - Arguments to delete one SequelizeMeta.
     * @example
     * // Delete one SequelizeMeta
     * const SequelizeMeta = await prisma.sequelizeMeta.delete({
     *   where: {
     *     // ... filter to delete one SequelizeMeta
     *   }
     * })
     * 
     */
    delete<T extends SequelizeMetaDeleteArgs>(args: SelectSubset<T, SequelizeMetaDeleteArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SequelizeMeta.
     * @param {SequelizeMetaUpdateArgs} args - Arguments to update one SequelizeMeta.
     * @example
     * // Update one SequelizeMeta
     * const sequelizeMeta = await prisma.sequelizeMeta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SequelizeMetaUpdateArgs>(args: SelectSubset<T, SequelizeMetaUpdateArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SequelizeMetas.
     * @param {SequelizeMetaDeleteManyArgs} args - Arguments to filter SequelizeMetas to delete.
     * @example
     * // Delete a few SequelizeMetas
     * const { count } = await prisma.sequelizeMeta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SequelizeMetaDeleteManyArgs>(args?: SelectSubset<T, SequelizeMetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SequelizeMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SequelizeMetas
     * const sequelizeMeta = await prisma.sequelizeMeta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SequelizeMetaUpdateManyArgs>(args: SelectSubset<T, SequelizeMetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SequelizeMetas and returns the data updated in the database.
     * @param {SequelizeMetaUpdateManyAndReturnArgs} args - Arguments to update many SequelizeMetas.
     * @example
     * // Update many SequelizeMetas
     * const sequelizeMeta = await prisma.sequelizeMeta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SequelizeMetas and only return the `name`
     * const sequelizeMetaWithNameOnly = await prisma.sequelizeMeta.updateManyAndReturn({
     *   select: { name: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SequelizeMetaUpdateManyAndReturnArgs>(args: SelectSubset<T, SequelizeMetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SequelizeMeta.
     * @param {SequelizeMetaUpsertArgs} args - Arguments to update or create a SequelizeMeta.
     * @example
     * // Update or create a SequelizeMeta
     * const sequelizeMeta = await prisma.sequelizeMeta.upsert({
     *   create: {
     *     // ... data to create a SequelizeMeta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SequelizeMeta we want to update
     *   }
     * })
     */
    upsert<T extends SequelizeMetaUpsertArgs>(args: SelectSubset<T, SequelizeMetaUpsertArgs<ExtArgs>>): Prisma__SequelizeMetaClient<$Result.GetResult<Prisma.$SequelizeMetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SequelizeMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaCountArgs} args - Arguments to filter SequelizeMetas to count.
     * @example
     * // Count the number of SequelizeMetas
     * const count = await prisma.sequelizeMeta.count({
     *   where: {
     *     // ... the filter for the SequelizeMetas we want to count
     *   }
     * })
    **/
    count<T extends SequelizeMetaCountArgs>(
      args?: Subset<T, SequelizeMetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SequelizeMetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SequelizeMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SequelizeMetaAggregateArgs>(args: Subset<T, SequelizeMetaAggregateArgs>): Prisma.PrismaPromise<GetSequelizeMetaAggregateType<T>>

    /**
     * Group by SequelizeMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequelizeMetaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SequelizeMetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SequelizeMetaGroupByArgs['orderBy'] }
        : { orderBy?: SequelizeMetaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SequelizeMetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSequelizeMetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SequelizeMeta model
   */
  readonly fields: SequelizeMetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SequelizeMeta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SequelizeMetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SequelizeMeta model
   */
  interface SequelizeMetaFieldRefs {
    readonly name: FieldRef<"SequelizeMeta", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SequelizeMeta findUnique
   */
  export type SequelizeMetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * Filter, which SequelizeMeta to fetch.
     */
    where: SequelizeMetaWhereUniqueInput
  }

  /**
   * SequelizeMeta findUniqueOrThrow
   */
  export type SequelizeMetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * Filter, which SequelizeMeta to fetch.
     */
    where: SequelizeMetaWhereUniqueInput
  }

  /**
   * SequelizeMeta findFirst
   */
  export type SequelizeMetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * Filter, which SequelizeMeta to fetch.
     */
    where?: SequelizeMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SequelizeMetas to fetch.
     */
    orderBy?: SequelizeMetaOrderByWithRelationInput | SequelizeMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SequelizeMetas.
     */
    cursor?: SequelizeMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SequelizeMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SequelizeMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SequelizeMetas.
     */
    distinct?: SequelizeMetaScalarFieldEnum | SequelizeMetaScalarFieldEnum[]
  }

  /**
   * SequelizeMeta findFirstOrThrow
   */
  export type SequelizeMetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * Filter, which SequelizeMeta to fetch.
     */
    where?: SequelizeMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SequelizeMetas to fetch.
     */
    orderBy?: SequelizeMetaOrderByWithRelationInput | SequelizeMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SequelizeMetas.
     */
    cursor?: SequelizeMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SequelizeMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SequelizeMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SequelizeMetas.
     */
    distinct?: SequelizeMetaScalarFieldEnum | SequelizeMetaScalarFieldEnum[]
  }

  /**
   * SequelizeMeta findMany
   */
  export type SequelizeMetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * Filter, which SequelizeMetas to fetch.
     */
    where?: SequelizeMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SequelizeMetas to fetch.
     */
    orderBy?: SequelizeMetaOrderByWithRelationInput | SequelizeMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SequelizeMetas.
     */
    cursor?: SequelizeMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SequelizeMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SequelizeMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SequelizeMetas.
     */
    distinct?: SequelizeMetaScalarFieldEnum | SequelizeMetaScalarFieldEnum[]
  }

  /**
   * SequelizeMeta create
   */
  export type SequelizeMetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * The data needed to create a SequelizeMeta.
     */
    data: XOR<SequelizeMetaCreateInput, SequelizeMetaUncheckedCreateInput>
  }

  /**
   * SequelizeMeta createMany
   */
  export type SequelizeMetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SequelizeMetas.
     */
    data: SequelizeMetaCreateManyInput | SequelizeMetaCreateManyInput[]
  }

  /**
   * SequelizeMeta createManyAndReturn
   */
  export type SequelizeMetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * The data used to create many SequelizeMetas.
     */
    data: SequelizeMetaCreateManyInput | SequelizeMetaCreateManyInput[]
  }

  /**
   * SequelizeMeta update
   */
  export type SequelizeMetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * The data needed to update a SequelizeMeta.
     */
    data: XOR<SequelizeMetaUpdateInput, SequelizeMetaUncheckedUpdateInput>
    /**
     * Choose, which SequelizeMeta to update.
     */
    where: SequelizeMetaWhereUniqueInput
  }

  /**
   * SequelizeMeta updateMany
   */
  export type SequelizeMetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SequelizeMetas.
     */
    data: XOR<SequelizeMetaUpdateManyMutationInput, SequelizeMetaUncheckedUpdateManyInput>
    /**
     * Filter which SequelizeMetas to update
     */
    where?: SequelizeMetaWhereInput
    /**
     * Limit how many SequelizeMetas to update.
     */
    limit?: number
  }

  /**
   * SequelizeMeta updateManyAndReturn
   */
  export type SequelizeMetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * The data used to update SequelizeMetas.
     */
    data: XOR<SequelizeMetaUpdateManyMutationInput, SequelizeMetaUncheckedUpdateManyInput>
    /**
     * Filter which SequelizeMetas to update
     */
    where?: SequelizeMetaWhereInput
    /**
     * Limit how many SequelizeMetas to update.
     */
    limit?: number
  }

  /**
   * SequelizeMeta upsert
   */
  export type SequelizeMetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * The filter to search for the SequelizeMeta to update in case it exists.
     */
    where: SequelizeMetaWhereUniqueInput
    /**
     * In case the SequelizeMeta found by the `where` argument doesn't exist, create a new SequelizeMeta with this data.
     */
    create: XOR<SequelizeMetaCreateInput, SequelizeMetaUncheckedCreateInput>
    /**
     * In case the SequelizeMeta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SequelizeMetaUpdateInput, SequelizeMetaUncheckedUpdateInput>
  }

  /**
   * SequelizeMeta delete
   */
  export type SequelizeMetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
    /**
     * Filter which SequelizeMeta to delete.
     */
    where: SequelizeMetaWhereUniqueInput
  }

  /**
   * SequelizeMeta deleteMany
   */
  export type SequelizeMetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SequelizeMetas to delete
     */
    where?: SequelizeMetaWhereInput
    /**
     * Limit how many SequelizeMetas to delete.
     */
    limit?: number
  }

  /**
   * SequelizeMeta without action
   */
  export type SequelizeMetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequelizeMeta
     */
    select?: SequelizeMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SequelizeMeta
     */
    omit?: SequelizeMetaOmit<ExtArgs> | null
  }


  /**
   * Model brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: boolean | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: boolean | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    createdby: number
    updatedby: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrandMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which brand to aggregate.
     */
    where?: brandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandOrderByWithRelationInput | brandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: brandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type brandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: brandWhereInput
    orderBy?: brandOrderByWithAggregationInput | brandOrderByWithAggregationInput[]
    by: BrandScalarFieldEnum[] | BrandScalarFieldEnum
    having?: brandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }

  export type BrandGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: boolean | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends brandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type brandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["brand"]>

  export type brandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["brand"]>

  export type brandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["brand"]>

  export type brandSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type brandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "createdby" | "updatedby" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["brand"]>

  export type $brandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "brand"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: boolean | null
      createdby: string | null
      updatedby: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brand"]>
    composites: {}
  }

  type brandGetPayload<S extends boolean | null | undefined | brandDefaultArgs> = $Result.GetResult<Prisma.$brandPayload, S>

  type brandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<brandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrandCountAggregateInputType | true
    }

  export interface brandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['brand'], meta: { name: 'brand' } }
    /**
     * Find zero or one Brand that matches the filter.
     * @param {brandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends brandFindUniqueArgs>(args: SelectSubset<T, brandFindUniqueArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Brand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {brandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends brandFindUniqueOrThrowArgs>(args: SelectSubset<T, brandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends brandFindFirstArgs>(args?: SelectSubset<T, brandFindFirstArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends brandFindFirstOrThrowArgs>(args?: SelectSubset<T, brandFindFirstOrThrowArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends brandFindManyArgs>(args?: SelectSubset<T, brandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Brand.
     * @param {brandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
     */
    create<T extends brandCreateArgs>(args: SelectSubset<T, brandCreateArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Brands.
     * @param {brandCreateManyArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends brandCreateManyArgs>(args?: SelectSubset<T, brandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Brands and returns the data saved in the database.
     * @param {brandCreateManyAndReturnArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Brands and only return the `id`
     * const brandWithIdOnly = await prisma.brand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends brandCreateManyAndReturnArgs>(args?: SelectSubset<T, brandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Brand.
     * @param {brandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
     */
    delete<T extends brandDeleteArgs>(args: SelectSubset<T, brandDeleteArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Brand.
     * @param {brandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends brandUpdateArgs>(args: SelectSubset<T, brandUpdateArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Brands.
     * @param {brandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends brandDeleteManyArgs>(args?: SelectSubset<T, brandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends brandUpdateManyArgs>(args: SelectSubset<T, brandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands and returns the data updated in the database.
     * @param {brandUpdateManyAndReturnArgs} args - Arguments to update many Brands.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Brands and only return the `id`
     * const brandWithIdOnly = await prisma.brand.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends brandUpdateManyAndReturnArgs>(args: SelectSubset<T, brandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Brand.
     * @param {brandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
     */
    upsert<T extends brandUpsertArgs>(args: SelectSubset<T, brandUpsertArgs<ExtArgs>>): Prisma__brandClient<$Result.GetResult<Prisma.$brandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends brandCountArgs>(
      args?: Subset<T, brandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends brandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: brandGroupByArgs['orderBy'] }
        : { orderBy?: brandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, brandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the brand model
   */
  readonly fields: brandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__brandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the brand model
   */
  interface brandFieldRefs {
    readonly id: FieldRef<"brand", 'String'>
    readonly name: FieldRef<"brand", 'String'>
    readonly description: FieldRef<"brand", 'String'>
    readonly status: FieldRef<"brand", 'Boolean'>
    readonly createdby: FieldRef<"brand", 'String'>
    readonly updatedby: FieldRef<"brand", 'String'>
    readonly source: FieldRef<"brand", 'String'>
    readonly createdAt: FieldRef<"brand", 'DateTime'>
    readonly updatedAt: FieldRef<"brand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * brand findUnique
   */
  export type brandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * Filter, which brand to fetch.
     */
    where: brandWhereUniqueInput
  }

  /**
   * brand findUniqueOrThrow
   */
  export type brandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * Filter, which brand to fetch.
     */
    where: brandWhereUniqueInput
  }

  /**
   * brand findFirst
   */
  export type brandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * Filter, which brand to fetch.
     */
    where?: brandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandOrderByWithRelationInput | brandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for brands.
     */
    cursor?: brandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * brand findFirstOrThrow
   */
  export type brandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * Filter, which brand to fetch.
     */
    where?: brandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandOrderByWithRelationInput | brandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for brands.
     */
    cursor?: brandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * brand findMany
   */
  export type brandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * Filter, which brands to fetch.
     */
    where?: brandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandOrderByWithRelationInput | brandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing brands.
     */
    cursor?: brandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * brand create
   */
  export type brandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * The data needed to create a brand.
     */
    data: XOR<brandCreateInput, brandUncheckedCreateInput>
  }

  /**
   * brand createMany
   */
  export type brandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many brands.
     */
    data: brandCreateManyInput | brandCreateManyInput[]
  }

  /**
   * brand createManyAndReturn
   */
  export type brandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * The data used to create many brands.
     */
    data: brandCreateManyInput | brandCreateManyInput[]
  }

  /**
   * brand update
   */
  export type brandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * The data needed to update a brand.
     */
    data: XOR<brandUpdateInput, brandUncheckedUpdateInput>
    /**
     * Choose, which brand to update.
     */
    where: brandWhereUniqueInput
  }

  /**
   * brand updateMany
   */
  export type brandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update brands.
     */
    data: XOR<brandUpdateManyMutationInput, brandUncheckedUpdateManyInput>
    /**
     * Filter which brands to update
     */
    where?: brandWhereInput
    /**
     * Limit how many brands to update.
     */
    limit?: number
  }

  /**
   * brand updateManyAndReturn
   */
  export type brandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * The data used to update brands.
     */
    data: XOR<brandUpdateManyMutationInput, brandUncheckedUpdateManyInput>
    /**
     * Filter which brands to update
     */
    where?: brandWhereInput
    /**
     * Limit how many brands to update.
     */
    limit?: number
  }

  /**
   * brand upsert
   */
  export type brandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * The filter to search for the brand to update in case it exists.
     */
    where: brandWhereUniqueInput
    /**
     * In case the brand found by the `where` argument doesn't exist, create a new brand with this data.
     */
    create: XOR<brandCreateInput, brandUncheckedCreateInput>
    /**
     * In case the brand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<brandUpdateInput, brandUncheckedUpdateInput>
  }

  /**
   * brand delete
   */
  export type brandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
    /**
     * Filter which brand to delete.
     */
    where: brandWhereUniqueInput
  }

  /**
   * brand deleteMany
   */
  export type brandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which brands to delete
     */
    where?: brandWhereInput
    /**
     * Limit how many brands to delete.
     */
    limit?: number
  }

  /**
   * brand without action
   */
  export type brandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brand
     */
    select?: brandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the brand
     */
    omit?: brandOmit<ExtArgs> | null
  }


  /**
   * Model cashclosing
   */

  export type AggregateCashclosing = {
    _count: CashclosingCountAggregateOutputType | null
    _avg: CashclosingAvgAggregateOutputType | null
    _sum: CashclosingSumAggregateOutputType | null
    _min: CashclosingMinAggregateOutputType | null
    _max: CashclosingMaxAggregateOutputType | null
  }

  export type CashclosingAvgAggregateOutputType = {
    closingbalance: number | null
    expence: number | null
    sale: number | null
  }

  export type CashclosingSumAggregateOutputType = {
    closingbalance: number | null
    expence: number | null
    sale: number | null
  }

  export type CashclosingMinAggregateOutputType = {
    id: string | null
    closingbalance: number | null
    date: Date | null
    expence: number | null
    note: string | null
    sale: number | null
    fk_user_in_cashclosing: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CashclosingMaxAggregateOutputType = {
    id: string | null
    closingbalance: number | null
    date: Date | null
    expence: number | null
    note: string | null
    sale: number | null
    fk_user_in_cashclosing: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CashclosingCountAggregateOutputType = {
    id: number
    closingbalance: number
    date: number
    expence: number
    note: number
    sale: number
    fk_user_in_cashclosing: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CashclosingAvgAggregateInputType = {
    closingbalance?: true
    expence?: true
    sale?: true
  }

  export type CashclosingSumAggregateInputType = {
    closingbalance?: true
    expence?: true
    sale?: true
  }

  export type CashclosingMinAggregateInputType = {
    id?: true
    closingbalance?: true
    date?: true
    expence?: true
    note?: true
    sale?: true
    fk_user_in_cashclosing?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CashclosingMaxAggregateInputType = {
    id?: true
    closingbalance?: true
    date?: true
    expence?: true
    note?: true
    sale?: true
    fk_user_in_cashclosing?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CashclosingCountAggregateInputType = {
    id?: true
    closingbalance?: true
    date?: true
    expence?: true
    note?: true
    sale?: true
    fk_user_in_cashclosing?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CashclosingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cashclosing to aggregate.
     */
    where?: cashclosingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cashclosings to fetch.
     */
    orderBy?: cashclosingOrderByWithRelationInput | cashclosingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cashclosingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cashclosings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cashclosings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cashclosings
    **/
    _count?: true | CashclosingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashclosingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashclosingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashclosingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashclosingMaxAggregateInputType
  }

  export type GetCashclosingAggregateType<T extends CashclosingAggregateArgs> = {
        [P in keyof T & keyof AggregateCashclosing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashclosing[P]>
      : GetScalarType<T[P], AggregateCashclosing[P]>
  }




  export type cashclosingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cashclosingWhereInput
    orderBy?: cashclosingOrderByWithAggregationInput | cashclosingOrderByWithAggregationInput[]
    by: CashclosingScalarFieldEnum[] | CashclosingScalarFieldEnum
    having?: cashclosingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashclosingCountAggregateInputType | true
    _avg?: CashclosingAvgAggregateInputType
    _sum?: CashclosingSumAggregateInputType
    _min?: CashclosingMinAggregateInputType
    _max?: CashclosingMaxAggregateInputType
  }

  export type CashclosingGroupByOutputType = {
    id: string
    closingbalance: number | null
    date: Date | null
    expence: number | null
    note: string | null
    sale: number | null
    fk_user_in_cashclosing: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: CashclosingCountAggregateOutputType | null
    _avg: CashclosingAvgAggregateOutputType | null
    _sum: CashclosingSumAggregateOutputType | null
    _min: CashclosingMinAggregateOutputType | null
    _max: CashclosingMaxAggregateOutputType | null
  }

  type GetCashclosingGroupByPayload<T extends cashclosingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CashclosingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashclosingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashclosingGroupByOutputType[P]>
            : GetScalarType<T[P], CashclosingGroupByOutputType[P]>
        }
      >
    >


  export type cashclosingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    closingbalance?: boolean
    date?: boolean
    expence?: boolean
    note?: boolean
    sale?: boolean
    fk_user_in_cashclosing?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cashclosing"]>

  export type cashclosingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    closingbalance?: boolean
    date?: boolean
    expence?: boolean
    note?: boolean
    sale?: boolean
    fk_user_in_cashclosing?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cashclosing"]>

  export type cashclosingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    closingbalance?: boolean
    date?: boolean
    expence?: boolean
    note?: boolean
    sale?: boolean
    fk_user_in_cashclosing?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cashclosing"]>

  export type cashclosingSelectScalar = {
    id?: boolean
    closingbalance?: boolean
    date?: boolean
    expence?: boolean
    note?: boolean
    sale?: boolean
    fk_user_in_cashclosing?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type cashclosingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "closingbalance" | "date" | "expence" | "note" | "sale" | "fk_user_in_cashclosing" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["cashclosing"]>

  export type $cashclosingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cashclosing"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      closingbalance: number | null
      date: Date | null
      expence: number | null
      note: string | null
      sale: number | null
      fk_user_in_cashclosing: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cashclosing"]>
    composites: {}
  }

  type cashclosingGetPayload<S extends boolean | null | undefined | cashclosingDefaultArgs> = $Result.GetResult<Prisma.$cashclosingPayload, S>

  type cashclosingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cashclosingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CashclosingCountAggregateInputType | true
    }

  export interface cashclosingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cashclosing'], meta: { name: 'cashclosing' } }
    /**
     * Find zero or one Cashclosing that matches the filter.
     * @param {cashclosingFindUniqueArgs} args - Arguments to find a Cashclosing
     * @example
     * // Get one Cashclosing
     * const cashclosing = await prisma.cashclosing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cashclosingFindUniqueArgs>(args: SelectSubset<T, cashclosingFindUniqueArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cashclosing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cashclosingFindUniqueOrThrowArgs} args - Arguments to find a Cashclosing
     * @example
     * // Get one Cashclosing
     * const cashclosing = await prisma.cashclosing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cashclosingFindUniqueOrThrowArgs>(args: SelectSubset<T, cashclosingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cashclosing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cashclosingFindFirstArgs} args - Arguments to find a Cashclosing
     * @example
     * // Get one Cashclosing
     * const cashclosing = await prisma.cashclosing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cashclosingFindFirstArgs>(args?: SelectSubset<T, cashclosingFindFirstArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cashclosing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cashclosingFindFirstOrThrowArgs} args - Arguments to find a Cashclosing
     * @example
     * // Get one Cashclosing
     * const cashclosing = await prisma.cashclosing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cashclosingFindFirstOrThrowArgs>(args?: SelectSubset<T, cashclosingFindFirstOrThrowArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cashclosings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cashclosingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cashclosings
     * const cashclosings = await prisma.cashclosing.findMany()
     * 
     * // Get first 10 Cashclosings
     * const cashclosings = await prisma.cashclosing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cashclosingWithIdOnly = await prisma.cashclosing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cashclosingFindManyArgs>(args?: SelectSubset<T, cashclosingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cashclosing.
     * @param {cashclosingCreateArgs} args - Arguments to create a Cashclosing.
     * @example
     * // Create one Cashclosing
     * const Cashclosing = await prisma.cashclosing.create({
     *   data: {
     *     // ... data to create a Cashclosing
     *   }
     * })
     * 
     */
    create<T extends cashclosingCreateArgs>(args: SelectSubset<T, cashclosingCreateArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cashclosings.
     * @param {cashclosingCreateManyArgs} args - Arguments to create many Cashclosings.
     * @example
     * // Create many Cashclosings
     * const cashclosing = await prisma.cashclosing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cashclosingCreateManyArgs>(args?: SelectSubset<T, cashclosingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cashclosings and returns the data saved in the database.
     * @param {cashclosingCreateManyAndReturnArgs} args - Arguments to create many Cashclosings.
     * @example
     * // Create many Cashclosings
     * const cashclosing = await prisma.cashclosing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cashclosings and only return the `id`
     * const cashclosingWithIdOnly = await prisma.cashclosing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cashclosingCreateManyAndReturnArgs>(args?: SelectSubset<T, cashclosingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cashclosing.
     * @param {cashclosingDeleteArgs} args - Arguments to delete one Cashclosing.
     * @example
     * // Delete one Cashclosing
     * const Cashclosing = await prisma.cashclosing.delete({
     *   where: {
     *     // ... filter to delete one Cashclosing
     *   }
     * })
     * 
     */
    delete<T extends cashclosingDeleteArgs>(args: SelectSubset<T, cashclosingDeleteArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cashclosing.
     * @param {cashclosingUpdateArgs} args - Arguments to update one Cashclosing.
     * @example
     * // Update one Cashclosing
     * const cashclosing = await prisma.cashclosing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cashclosingUpdateArgs>(args: SelectSubset<T, cashclosingUpdateArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cashclosings.
     * @param {cashclosingDeleteManyArgs} args - Arguments to filter Cashclosings to delete.
     * @example
     * // Delete a few Cashclosings
     * const { count } = await prisma.cashclosing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cashclosingDeleteManyArgs>(args?: SelectSubset<T, cashclosingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cashclosings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cashclosingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cashclosings
     * const cashclosing = await prisma.cashclosing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cashclosingUpdateManyArgs>(args: SelectSubset<T, cashclosingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cashclosings and returns the data updated in the database.
     * @param {cashclosingUpdateManyAndReturnArgs} args - Arguments to update many Cashclosings.
     * @example
     * // Update many Cashclosings
     * const cashclosing = await prisma.cashclosing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cashclosings and only return the `id`
     * const cashclosingWithIdOnly = await prisma.cashclosing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cashclosingUpdateManyAndReturnArgs>(args: SelectSubset<T, cashclosingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cashclosing.
     * @param {cashclosingUpsertArgs} args - Arguments to update or create a Cashclosing.
     * @example
     * // Update or create a Cashclosing
     * const cashclosing = await prisma.cashclosing.upsert({
     *   create: {
     *     // ... data to create a Cashclosing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cashclosing we want to update
     *   }
     * })
     */
    upsert<T extends cashclosingUpsertArgs>(args: SelectSubset<T, cashclosingUpsertArgs<ExtArgs>>): Prisma__cashclosingClient<$Result.GetResult<Prisma.$cashclosingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cashclosings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cashclosingCountArgs} args - Arguments to filter Cashclosings to count.
     * @example
     * // Count the number of Cashclosings
     * const count = await prisma.cashclosing.count({
     *   where: {
     *     // ... the filter for the Cashclosings we want to count
     *   }
     * })
    **/
    count<T extends cashclosingCountArgs>(
      args?: Subset<T, cashclosingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashclosingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cashclosing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashclosingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CashclosingAggregateArgs>(args: Subset<T, CashclosingAggregateArgs>): Prisma.PrismaPromise<GetCashclosingAggregateType<T>>

    /**
     * Group by Cashclosing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cashclosingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cashclosingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cashclosingGroupByArgs['orderBy'] }
        : { orderBy?: cashclosingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cashclosingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashclosingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cashclosing model
   */
  readonly fields: cashclosingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cashclosing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cashclosingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cashclosing model
   */
  interface cashclosingFieldRefs {
    readonly id: FieldRef<"cashclosing", 'String'>
    readonly closingbalance: FieldRef<"cashclosing", 'Float'>
    readonly date: FieldRef<"cashclosing", 'DateTime'>
    readonly expence: FieldRef<"cashclosing", 'Float'>
    readonly note: FieldRef<"cashclosing", 'String'>
    readonly sale: FieldRef<"cashclosing", 'Float'>
    readonly fk_user_in_cashclosing: FieldRef<"cashclosing", 'String'>
    readonly source: FieldRef<"cashclosing", 'String'>
    readonly createdAt: FieldRef<"cashclosing", 'DateTime'>
    readonly updatedAt: FieldRef<"cashclosing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * cashclosing findUnique
   */
  export type cashclosingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * Filter, which cashclosing to fetch.
     */
    where: cashclosingWhereUniqueInput
  }

  /**
   * cashclosing findUniqueOrThrow
   */
  export type cashclosingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * Filter, which cashclosing to fetch.
     */
    where: cashclosingWhereUniqueInput
  }

  /**
   * cashclosing findFirst
   */
  export type cashclosingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * Filter, which cashclosing to fetch.
     */
    where?: cashclosingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cashclosings to fetch.
     */
    orderBy?: cashclosingOrderByWithRelationInput | cashclosingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cashclosings.
     */
    cursor?: cashclosingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cashclosings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cashclosings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cashclosings.
     */
    distinct?: CashclosingScalarFieldEnum | CashclosingScalarFieldEnum[]
  }

  /**
   * cashclosing findFirstOrThrow
   */
  export type cashclosingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * Filter, which cashclosing to fetch.
     */
    where?: cashclosingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cashclosings to fetch.
     */
    orderBy?: cashclosingOrderByWithRelationInput | cashclosingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cashclosings.
     */
    cursor?: cashclosingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cashclosings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cashclosings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cashclosings.
     */
    distinct?: CashclosingScalarFieldEnum | CashclosingScalarFieldEnum[]
  }

  /**
   * cashclosing findMany
   */
  export type cashclosingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * Filter, which cashclosings to fetch.
     */
    where?: cashclosingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cashclosings to fetch.
     */
    orderBy?: cashclosingOrderByWithRelationInput | cashclosingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cashclosings.
     */
    cursor?: cashclosingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cashclosings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cashclosings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cashclosings.
     */
    distinct?: CashclosingScalarFieldEnum | CashclosingScalarFieldEnum[]
  }

  /**
   * cashclosing create
   */
  export type cashclosingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * The data needed to create a cashclosing.
     */
    data: XOR<cashclosingCreateInput, cashclosingUncheckedCreateInput>
  }

  /**
   * cashclosing createMany
   */
  export type cashclosingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cashclosings.
     */
    data: cashclosingCreateManyInput | cashclosingCreateManyInput[]
  }

  /**
   * cashclosing createManyAndReturn
   */
  export type cashclosingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * The data used to create many cashclosings.
     */
    data: cashclosingCreateManyInput | cashclosingCreateManyInput[]
  }

  /**
   * cashclosing update
   */
  export type cashclosingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * The data needed to update a cashclosing.
     */
    data: XOR<cashclosingUpdateInput, cashclosingUncheckedUpdateInput>
    /**
     * Choose, which cashclosing to update.
     */
    where: cashclosingWhereUniqueInput
  }

  /**
   * cashclosing updateMany
   */
  export type cashclosingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cashclosings.
     */
    data: XOR<cashclosingUpdateManyMutationInput, cashclosingUncheckedUpdateManyInput>
    /**
     * Filter which cashclosings to update
     */
    where?: cashclosingWhereInput
    /**
     * Limit how many cashclosings to update.
     */
    limit?: number
  }

  /**
   * cashclosing updateManyAndReturn
   */
  export type cashclosingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * The data used to update cashclosings.
     */
    data: XOR<cashclosingUpdateManyMutationInput, cashclosingUncheckedUpdateManyInput>
    /**
     * Filter which cashclosings to update
     */
    where?: cashclosingWhereInput
    /**
     * Limit how many cashclosings to update.
     */
    limit?: number
  }

  /**
   * cashclosing upsert
   */
  export type cashclosingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * The filter to search for the cashclosing to update in case it exists.
     */
    where: cashclosingWhereUniqueInput
    /**
     * In case the cashclosing found by the `where` argument doesn't exist, create a new cashclosing with this data.
     */
    create: XOR<cashclosingCreateInput, cashclosingUncheckedCreateInput>
    /**
     * In case the cashclosing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cashclosingUpdateInput, cashclosingUncheckedUpdateInput>
  }

  /**
   * cashclosing delete
   */
  export type cashclosingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
    /**
     * Filter which cashclosing to delete.
     */
    where: cashclosingWhereUniqueInput
  }

  /**
   * cashclosing deleteMany
   */
  export type cashclosingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cashclosings to delete
     */
    where?: cashclosingWhereInput
    /**
     * Limit how many cashclosings to delete.
     */
    limit?: number
  }

  /**
   * cashclosing without action
   */
  export type cashclosingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cashclosing
     */
    select?: cashclosingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cashclosing
     */
    omit?: cashclosingOmit<ExtArgs> | null
  }


  /**
   * Model category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: boolean | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: boolean | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    createdby: number
    updatedby: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which category to aggregate.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithAggregationInput | categoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: boolean | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "createdby" | "updatedby" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>

  export type $categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "category"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: boolean | null
      createdby: string | null
      updatedby: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type categoryGetPayload<S extends boolean | null | undefined | categoryDefaultArgs> = $Result.GetResult<Prisma.$categoryPayload, S>

  type categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['category'], meta: { name: 'category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {categoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoryFindUniqueArgs>(args: SelectSubset<T, categoryFindUniqueArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoryFindFirstArgs>(args?: SelectSubset<T, categoryFindFirstArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoryFindManyArgs>(args?: SelectSubset<T, categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {categoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends categoryCreateArgs>(args: SelectSubset<T, categoryCreateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoryCreateManyArgs>(args?: SelectSubset<T, categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {categoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends categoryDeleteArgs>(args: SelectSubset<T, categoryDeleteArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {categoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoryUpdateArgs>(args: SelectSubset<T, categoryUpdateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoryDeleteManyArgs>(args?: SelectSubset<T, categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoryUpdateManyArgs>(args: SelectSubset<T, categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {categoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends categoryUpsertArgs>(args: SelectSubset<T, categoryUpsertArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoryCountArgs>(
      args?: Subset<T, categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoryGroupByArgs['orderBy'] }
        : { orderBy?: categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the category model
   */
  readonly fields: categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the category model
   */
  interface categoryFieldRefs {
    readonly id: FieldRef<"category", 'String'>
    readonly name: FieldRef<"category", 'String'>
    readonly description: FieldRef<"category", 'String'>
    readonly status: FieldRef<"category", 'Boolean'>
    readonly createdby: FieldRef<"category", 'String'>
    readonly updatedby: FieldRef<"category", 'String'>
    readonly source: FieldRef<"category", 'String'>
    readonly createdAt: FieldRef<"category", 'DateTime'>
    readonly updatedAt: FieldRef<"category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * category findUnique
   */
  export type categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findUniqueOrThrow
   */
  export type categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findFirst
   */
  export type categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findFirstOrThrow
   */
  export type categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findMany
   */
  export type categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category create
   */
  export type categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data needed to create a category.
     */
    data: XOR<categoryCreateInput, categoryUncheckedCreateInput>
  }

  /**
   * category createMany
   */
  export type categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
  }

  /**
   * category createManyAndReturn
   */
  export type categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
  }

  /**
   * category update
   */
  export type categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data needed to update a category.
     */
    data: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
    /**
     * Choose, which category to update.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category updateMany
   */
  export type categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category updateManyAndReturn
   */
  export type categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category upsert
   */
  export type categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The filter to search for the category to update in case it exists.
     */
    where: categoryWhereUniqueInput
    /**
     * In case the category found by the `where` argument doesn't exist, create a new category with this data.
     */
    create: XOR<categoryCreateInput, categoryUncheckedCreateInput>
    /**
     * In case the category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
  }

  /**
   * category delete
   */
  export type categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Filter which category to delete.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category deleteMany
   */
  export type categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * category without action
   */
  export type categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
  }


  /**
   * Model financeaccount
   */

  export type AggregateFinanceaccount = {
    _count: FinanceaccountCountAggregateOutputType | null
    _avg: FinanceaccountAvgAggregateOutputType | null
    _sum: FinanceaccountSumAggregateOutputType | null
    _min: FinanceaccountMinAggregateOutputType | null
    _max: FinanceaccountMaxAggregateOutputType | null
  }

  export type FinanceaccountAvgAggregateOutputType = {
    value: Decimal | null
  }

  export type FinanceaccountSumAggregateOutputType = {
    value: Decimal | null
  }

  export type FinanceaccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    fk_parent_in_financeaccount: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    value: Decimal | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinanceaccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    fk_parent_in_financeaccount: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    value: Decimal | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinanceaccountCountAggregateOutputType = {
    id: number
    name: number
    type: number
    fk_parent_in_financeaccount: number
    createdby: number
    updatedby: number
    source: number
    value: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FinanceaccountAvgAggregateInputType = {
    value?: true
  }

  export type FinanceaccountSumAggregateInputType = {
    value?: true
  }

  export type FinanceaccountMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    fk_parent_in_financeaccount?: true
    createdby?: true
    updatedby?: true
    source?: true
    value?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinanceaccountMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    fk_parent_in_financeaccount?: true
    createdby?: true
    updatedby?: true
    source?: true
    value?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinanceaccountCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    fk_parent_in_financeaccount?: true
    createdby?: true
    updatedby?: true
    source?: true
    value?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FinanceaccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which financeaccount to aggregate.
     */
    where?: financeaccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financeaccounts to fetch.
     */
    orderBy?: financeaccountOrderByWithRelationInput | financeaccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: financeaccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financeaccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financeaccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned financeaccounts
    **/
    _count?: true | FinanceaccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinanceaccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinanceaccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinanceaccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinanceaccountMaxAggregateInputType
  }

  export type GetFinanceaccountAggregateType<T extends FinanceaccountAggregateArgs> = {
        [P in keyof T & keyof AggregateFinanceaccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinanceaccount[P]>
      : GetScalarType<T[P], AggregateFinanceaccount[P]>
  }




  export type financeaccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: financeaccountWhereInput
    orderBy?: financeaccountOrderByWithAggregationInput | financeaccountOrderByWithAggregationInput[]
    by: FinanceaccountScalarFieldEnum[] | FinanceaccountScalarFieldEnum
    having?: financeaccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinanceaccountCountAggregateInputType | true
    _avg?: FinanceaccountAvgAggregateInputType
    _sum?: FinanceaccountSumAggregateInputType
    _min?: FinanceaccountMinAggregateInputType
    _max?: FinanceaccountMaxAggregateInputType
  }

  export type FinanceaccountGroupByOutputType = {
    id: string
    name: string | null
    type: string | null
    fk_parent_in_financeaccount: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    value: Decimal | null
    isDefault: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: FinanceaccountCountAggregateOutputType | null
    _avg: FinanceaccountAvgAggregateOutputType | null
    _sum: FinanceaccountSumAggregateOutputType | null
    _min: FinanceaccountMinAggregateOutputType | null
    _max: FinanceaccountMaxAggregateOutputType | null
  }

  type GetFinanceaccountGroupByPayload<T extends financeaccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinanceaccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinanceaccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinanceaccountGroupByOutputType[P]>
            : GetScalarType<T[P], FinanceaccountGroupByOutputType[P]>
        }
      >
    >


  export type financeaccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    fk_parent_in_financeaccount?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    value?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["financeaccount"]>

  export type financeaccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    fk_parent_in_financeaccount?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    value?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["financeaccount"]>

  export type financeaccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    fk_parent_in_financeaccount?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    value?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["financeaccount"]>

  export type financeaccountSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    fk_parent_in_financeaccount?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    value?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type financeaccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "fk_parent_in_financeaccount" | "createdby" | "updatedby" | "source" | "value" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["financeaccount"]>

  export type $financeaccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "financeaccount"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      type: string | null
      fk_parent_in_financeaccount: string | null
      createdby: string | null
      updatedby: string | null
      source: string | null
      value: Prisma.Decimal | null
      isDefault: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["financeaccount"]>
    composites: {}
  }

  type financeaccountGetPayload<S extends boolean | null | undefined | financeaccountDefaultArgs> = $Result.GetResult<Prisma.$financeaccountPayload, S>

  type financeaccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<financeaccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinanceaccountCountAggregateInputType | true
    }

  export interface financeaccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['financeaccount'], meta: { name: 'financeaccount' } }
    /**
     * Find zero or one Financeaccount that matches the filter.
     * @param {financeaccountFindUniqueArgs} args - Arguments to find a Financeaccount
     * @example
     * // Get one Financeaccount
     * const financeaccount = await prisma.financeaccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends financeaccountFindUniqueArgs>(args: SelectSubset<T, financeaccountFindUniqueArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Financeaccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {financeaccountFindUniqueOrThrowArgs} args - Arguments to find a Financeaccount
     * @example
     * // Get one Financeaccount
     * const financeaccount = await prisma.financeaccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends financeaccountFindUniqueOrThrowArgs>(args: SelectSubset<T, financeaccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Financeaccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financeaccountFindFirstArgs} args - Arguments to find a Financeaccount
     * @example
     * // Get one Financeaccount
     * const financeaccount = await prisma.financeaccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends financeaccountFindFirstArgs>(args?: SelectSubset<T, financeaccountFindFirstArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Financeaccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financeaccountFindFirstOrThrowArgs} args - Arguments to find a Financeaccount
     * @example
     * // Get one Financeaccount
     * const financeaccount = await prisma.financeaccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends financeaccountFindFirstOrThrowArgs>(args?: SelectSubset<T, financeaccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Financeaccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financeaccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Financeaccounts
     * const financeaccounts = await prisma.financeaccount.findMany()
     * 
     * // Get first 10 Financeaccounts
     * const financeaccounts = await prisma.financeaccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financeaccountWithIdOnly = await prisma.financeaccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends financeaccountFindManyArgs>(args?: SelectSubset<T, financeaccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Financeaccount.
     * @param {financeaccountCreateArgs} args - Arguments to create a Financeaccount.
     * @example
     * // Create one Financeaccount
     * const Financeaccount = await prisma.financeaccount.create({
     *   data: {
     *     // ... data to create a Financeaccount
     *   }
     * })
     * 
     */
    create<T extends financeaccountCreateArgs>(args: SelectSubset<T, financeaccountCreateArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Financeaccounts.
     * @param {financeaccountCreateManyArgs} args - Arguments to create many Financeaccounts.
     * @example
     * // Create many Financeaccounts
     * const financeaccount = await prisma.financeaccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends financeaccountCreateManyArgs>(args?: SelectSubset<T, financeaccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Financeaccounts and returns the data saved in the database.
     * @param {financeaccountCreateManyAndReturnArgs} args - Arguments to create many Financeaccounts.
     * @example
     * // Create many Financeaccounts
     * const financeaccount = await prisma.financeaccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Financeaccounts and only return the `id`
     * const financeaccountWithIdOnly = await prisma.financeaccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends financeaccountCreateManyAndReturnArgs>(args?: SelectSubset<T, financeaccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Financeaccount.
     * @param {financeaccountDeleteArgs} args - Arguments to delete one Financeaccount.
     * @example
     * // Delete one Financeaccount
     * const Financeaccount = await prisma.financeaccount.delete({
     *   where: {
     *     // ... filter to delete one Financeaccount
     *   }
     * })
     * 
     */
    delete<T extends financeaccountDeleteArgs>(args: SelectSubset<T, financeaccountDeleteArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Financeaccount.
     * @param {financeaccountUpdateArgs} args - Arguments to update one Financeaccount.
     * @example
     * // Update one Financeaccount
     * const financeaccount = await prisma.financeaccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends financeaccountUpdateArgs>(args: SelectSubset<T, financeaccountUpdateArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Financeaccounts.
     * @param {financeaccountDeleteManyArgs} args - Arguments to filter Financeaccounts to delete.
     * @example
     * // Delete a few Financeaccounts
     * const { count } = await prisma.financeaccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends financeaccountDeleteManyArgs>(args?: SelectSubset<T, financeaccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Financeaccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financeaccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Financeaccounts
     * const financeaccount = await prisma.financeaccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends financeaccountUpdateManyArgs>(args: SelectSubset<T, financeaccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Financeaccounts and returns the data updated in the database.
     * @param {financeaccountUpdateManyAndReturnArgs} args - Arguments to update many Financeaccounts.
     * @example
     * // Update many Financeaccounts
     * const financeaccount = await prisma.financeaccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Financeaccounts and only return the `id`
     * const financeaccountWithIdOnly = await prisma.financeaccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends financeaccountUpdateManyAndReturnArgs>(args: SelectSubset<T, financeaccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Financeaccount.
     * @param {financeaccountUpsertArgs} args - Arguments to update or create a Financeaccount.
     * @example
     * // Update or create a Financeaccount
     * const financeaccount = await prisma.financeaccount.upsert({
     *   create: {
     *     // ... data to create a Financeaccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Financeaccount we want to update
     *   }
     * })
     */
    upsert<T extends financeaccountUpsertArgs>(args: SelectSubset<T, financeaccountUpsertArgs<ExtArgs>>): Prisma__financeaccountClient<$Result.GetResult<Prisma.$financeaccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Financeaccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financeaccountCountArgs} args - Arguments to filter Financeaccounts to count.
     * @example
     * // Count the number of Financeaccounts
     * const count = await prisma.financeaccount.count({
     *   where: {
     *     // ... the filter for the Financeaccounts we want to count
     *   }
     * })
    **/
    count<T extends financeaccountCountArgs>(
      args?: Subset<T, financeaccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinanceaccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Financeaccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinanceaccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinanceaccountAggregateArgs>(args: Subset<T, FinanceaccountAggregateArgs>): Prisma.PrismaPromise<GetFinanceaccountAggregateType<T>>

    /**
     * Group by Financeaccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financeaccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends financeaccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: financeaccountGroupByArgs['orderBy'] }
        : { orderBy?: financeaccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, financeaccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinanceaccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the financeaccount model
   */
  readonly fields: financeaccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for financeaccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__financeaccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the financeaccount model
   */
  interface financeaccountFieldRefs {
    readonly id: FieldRef<"financeaccount", 'String'>
    readonly name: FieldRef<"financeaccount", 'String'>
    readonly type: FieldRef<"financeaccount", 'String'>
    readonly fk_parent_in_financeaccount: FieldRef<"financeaccount", 'String'>
    readonly createdby: FieldRef<"financeaccount", 'String'>
    readonly updatedby: FieldRef<"financeaccount", 'String'>
    readonly source: FieldRef<"financeaccount", 'String'>
    readonly value: FieldRef<"financeaccount", 'Decimal'>
    readonly isDefault: FieldRef<"financeaccount", 'Boolean'>
    readonly createdAt: FieldRef<"financeaccount", 'DateTime'>
    readonly updatedAt: FieldRef<"financeaccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * financeaccount findUnique
   */
  export type financeaccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * Filter, which financeaccount to fetch.
     */
    where: financeaccountWhereUniqueInput
  }

  /**
   * financeaccount findUniqueOrThrow
   */
  export type financeaccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * Filter, which financeaccount to fetch.
     */
    where: financeaccountWhereUniqueInput
  }

  /**
   * financeaccount findFirst
   */
  export type financeaccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * Filter, which financeaccount to fetch.
     */
    where?: financeaccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financeaccounts to fetch.
     */
    orderBy?: financeaccountOrderByWithRelationInput | financeaccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for financeaccounts.
     */
    cursor?: financeaccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financeaccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financeaccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of financeaccounts.
     */
    distinct?: FinanceaccountScalarFieldEnum | FinanceaccountScalarFieldEnum[]
  }

  /**
   * financeaccount findFirstOrThrow
   */
  export type financeaccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * Filter, which financeaccount to fetch.
     */
    where?: financeaccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financeaccounts to fetch.
     */
    orderBy?: financeaccountOrderByWithRelationInput | financeaccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for financeaccounts.
     */
    cursor?: financeaccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financeaccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financeaccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of financeaccounts.
     */
    distinct?: FinanceaccountScalarFieldEnum | FinanceaccountScalarFieldEnum[]
  }

  /**
   * financeaccount findMany
   */
  export type financeaccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * Filter, which financeaccounts to fetch.
     */
    where?: financeaccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financeaccounts to fetch.
     */
    orderBy?: financeaccountOrderByWithRelationInput | financeaccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing financeaccounts.
     */
    cursor?: financeaccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financeaccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financeaccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of financeaccounts.
     */
    distinct?: FinanceaccountScalarFieldEnum | FinanceaccountScalarFieldEnum[]
  }

  /**
   * financeaccount create
   */
  export type financeaccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * The data needed to create a financeaccount.
     */
    data: XOR<financeaccountCreateInput, financeaccountUncheckedCreateInput>
  }

  /**
   * financeaccount createMany
   */
  export type financeaccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many financeaccounts.
     */
    data: financeaccountCreateManyInput | financeaccountCreateManyInput[]
  }

  /**
   * financeaccount createManyAndReturn
   */
  export type financeaccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * The data used to create many financeaccounts.
     */
    data: financeaccountCreateManyInput | financeaccountCreateManyInput[]
  }

  /**
   * financeaccount update
   */
  export type financeaccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * The data needed to update a financeaccount.
     */
    data: XOR<financeaccountUpdateInput, financeaccountUncheckedUpdateInput>
    /**
     * Choose, which financeaccount to update.
     */
    where: financeaccountWhereUniqueInput
  }

  /**
   * financeaccount updateMany
   */
  export type financeaccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update financeaccounts.
     */
    data: XOR<financeaccountUpdateManyMutationInput, financeaccountUncheckedUpdateManyInput>
    /**
     * Filter which financeaccounts to update
     */
    where?: financeaccountWhereInput
    /**
     * Limit how many financeaccounts to update.
     */
    limit?: number
  }

  /**
   * financeaccount updateManyAndReturn
   */
  export type financeaccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * The data used to update financeaccounts.
     */
    data: XOR<financeaccountUpdateManyMutationInput, financeaccountUncheckedUpdateManyInput>
    /**
     * Filter which financeaccounts to update
     */
    where?: financeaccountWhereInput
    /**
     * Limit how many financeaccounts to update.
     */
    limit?: number
  }

  /**
   * financeaccount upsert
   */
  export type financeaccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * The filter to search for the financeaccount to update in case it exists.
     */
    where: financeaccountWhereUniqueInput
    /**
     * In case the financeaccount found by the `where` argument doesn't exist, create a new financeaccount with this data.
     */
    create: XOR<financeaccountCreateInput, financeaccountUncheckedCreateInput>
    /**
     * In case the financeaccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<financeaccountUpdateInput, financeaccountUncheckedUpdateInput>
  }

  /**
   * financeaccount delete
   */
  export type financeaccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
    /**
     * Filter which financeaccount to delete.
     */
    where: financeaccountWhereUniqueInput
  }

  /**
   * financeaccount deleteMany
   */
  export type financeaccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which financeaccounts to delete
     */
    where?: financeaccountWhereInput
    /**
     * Limit how many financeaccounts to delete.
     */
    limit?: number
  }

  /**
   * financeaccount without action
   */
  export type financeaccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financeaccount
     */
    select?: financeaccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financeaccount
     */
    omit?: financeaccountOmit<ExtArgs> | null
  }


  /**
   * Model financetransaction
   */

  export type AggregateFinancetransaction = {
    _count: FinancetransactionCountAggregateOutputType | null
    _avg: FinancetransactionAvgAggregateOutputType | null
    _sum: FinancetransactionSumAggregateOutputType | null
    _min: FinancetransactionMinAggregateOutputType | null
    _max: FinancetransactionMaxAggregateOutputType | null
  }

  export type FinancetransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type FinancetransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type FinancetransactionMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: number | null
    status: string | null
    date: Date | null
    details: string | null
    source: string | null
    fk_user_targetto_in_financetransaction: string | null
    fk_financeaccount_in_financetransaction: string | null
    createdby: string | null
    updatedby: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinancetransactionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: number | null
    status: string | null
    date: Date | null
    details: string | null
    source: string | null
    fk_user_targetto_in_financetransaction: string | null
    fk_financeaccount_in_financetransaction: string | null
    createdby: string | null
    updatedby: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinancetransactionCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    status: number
    date: number
    details: number
    source: number
    fk_user_targetto_in_financetransaction: number
    fk_financeaccount_in_financetransaction: number
    createdby: number
    updatedby: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FinancetransactionAvgAggregateInputType = {
    amount?: true
  }

  export type FinancetransactionSumAggregateInputType = {
    amount?: true
  }

  export type FinancetransactionMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    status?: true
    date?: true
    details?: true
    source?: true
    fk_user_targetto_in_financetransaction?: true
    fk_financeaccount_in_financetransaction?: true
    createdby?: true
    updatedby?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinancetransactionMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    status?: true
    date?: true
    details?: true
    source?: true
    fk_user_targetto_in_financetransaction?: true
    fk_financeaccount_in_financetransaction?: true
    createdby?: true
    updatedby?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinancetransactionCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    status?: true
    date?: true
    details?: true
    source?: true
    fk_user_targetto_in_financetransaction?: true
    fk_financeaccount_in_financetransaction?: true
    createdby?: true
    updatedby?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FinancetransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which financetransaction to aggregate.
     */
    where?: financetransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financetransactions to fetch.
     */
    orderBy?: financetransactionOrderByWithRelationInput | financetransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: financetransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financetransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financetransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned financetransactions
    **/
    _count?: true | FinancetransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinancetransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinancetransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinancetransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinancetransactionMaxAggregateInputType
  }

  export type GetFinancetransactionAggregateType<T extends FinancetransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateFinancetransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinancetransaction[P]>
      : GetScalarType<T[P], AggregateFinancetransaction[P]>
  }




  export type financetransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: financetransactionWhereInput
    orderBy?: financetransactionOrderByWithAggregationInput | financetransactionOrderByWithAggregationInput[]
    by: FinancetransactionScalarFieldEnum[] | FinancetransactionScalarFieldEnum
    having?: financetransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinancetransactionCountAggregateInputType | true
    _avg?: FinancetransactionAvgAggregateInputType
    _sum?: FinancetransactionSumAggregateInputType
    _min?: FinancetransactionMinAggregateInputType
    _max?: FinancetransactionMaxAggregateInputType
  }

  export type FinancetransactionGroupByOutputType = {
    id: string
    name: string | null
    amount: number | null
    status: string | null
    date: Date | null
    details: string | null
    source: string | null
    fk_user_targetto_in_financetransaction: string | null
    fk_financeaccount_in_financetransaction: string | null
    createdby: string | null
    updatedby: string | null
    createdAt: Date
    updatedAt: Date
    _count: FinancetransactionCountAggregateOutputType | null
    _avg: FinancetransactionAvgAggregateOutputType | null
    _sum: FinancetransactionSumAggregateOutputType | null
    _min: FinancetransactionMinAggregateOutputType | null
    _max: FinancetransactionMaxAggregateOutputType | null
  }

  type GetFinancetransactionGroupByPayload<T extends financetransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinancetransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinancetransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinancetransactionGroupByOutputType[P]>
            : GetScalarType<T[P], FinancetransactionGroupByOutputType[P]>
        }
      >
    >


  export type financetransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    status?: boolean
    date?: boolean
    details?: boolean
    source?: boolean
    fk_user_targetto_in_financetransaction?: boolean
    fk_financeaccount_in_financetransaction?: boolean
    createdby?: boolean
    updatedby?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["financetransaction"]>

  export type financetransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    status?: boolean
    date?: boolean
    details?: boolean
    source?: boolean
    fk_user_targetto_in_financetransaction?: boolean
    fk_financeaccount_in_financetransaction?: boolean
    createdby?: boolean
    updatedby?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["financetransaction"]>

  export type financetransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    status?: boolean
    date?: boolean
    details?: boolean
    source?: boolean
    fk_user_targetto_in_financetransaction?: boolean
    fk_financeaccount_in_financetransaction?: boolean
    createdby?: boolean
    updatedby?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["financetransaction"]>

  export type financetransactionSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    status?: boolean
    date?: boolean
    details?: boolean
    source?: boolean
    fk_user_targetto_in_financetransaction?: boolean
    fk_financeaccount_in_financetransaction?: boolean
    createdby?: boolean
    updatedby?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type financetransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "amount" | "status" | "date" | "details" | "source" | "fk_user_targetto_in_financetransaction" | "fk_financeaccount_in_financetransaction" | "createdby" | "updatedby" | "createdAt" | "updatedAt", ExtArgs["result"]["financetransaction"]>

  export type $financetransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "financetransaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      amount: number | null
      status: string | null
      date: Date | null
      details: string | null
      source: string | null
      fk_user_targetto_in_financetransaction: string | null
      fk_financeaccount_in_financetransaction: string | null
      createdby: string | null
      updatedby: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["financetransaction"]>
    composites: {}
  }

  type financetransactionGetPayload<S extends boolean | null | undefined | financetransactionDefaultArgs> = $Result.GetResult<Prisma.$financetransactionPayload, S>

  type financetransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<financetransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinancetransactionCountAggregateInputType | true
    }

  export interface financetransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['financetransaction'], meta: { name: 'financetransaction' } }
    /**
     * Find zero or one Financetransaction that matches the filter.
     * @param {financetransactionFindUniqueArgs} args - Arguments to find a Financetransaction
     * @example
     * // Get one Financetransaction
     * const financetransaction = await prisma.financetransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends financetransactionFindUniqueArgs>(args: SelectSubset<T, financetransactionFindUniqueArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Financetransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {financetransactionFindUniqueOrThrowArgs} args - Arguments to find a Financetransaction
     * @example
     * // Get one Financetransaction
     * const financetransaction = await prisma.financetransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends financetransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, financetransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Financetransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financetransactionFindFirstArgs} args - Arguments to find a Financetransaction
     * @example
     * // Get one Financetransaction
     * const financetransaction = await prisma.financetransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends financetransactionFindFirstArgs>(args?: SelectSubset<T, financetransactionFindFirstArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Financetransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financetransactionFindFirstOrThrowArgs} args - Arguments to find a Financetransaction
     * @example
     * // Get one Financetransaction
     * const financetransaction = await prisma.financetransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends financetransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, financetransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Financetransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financetransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Financetransactions
     * const financetransactions = await prisma.financetransaction.findMany()
     * 
     * // Get first 10 Financetransactions
     * const financetransactions = await prisma.financetransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financetransactionWithIdOnly = await prisma.financetransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends financetransactionFindManyArgs>(args?: SelectSubset<T, financetransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Financetransaction.
     * @param {financetransactionCreateArgs} args - Arguments to create a Financetransaction.
     * @example
     * // Create one Financetransaction
     * const Financetransaction = await prisma.financetransaction.create({
     *   data: {
     *     // ... data to create a Financetransaction
     *   }
     * })
     * 
     */
    create<T extends financetransactionCreateArgs>(args: SelectSubset<T, financetransactionCreateArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Financetransactions.
     * @param {financetransactionCreateManyArgs} args - Arguments to create many Financetransactions.
     * @example
     * // Create many Financetransactions
     * const financetransaction = await prisma.financetransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends financetransactionCreateManyArgs>(args?: SelectSubset<T, financetransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Financetransactions and returns the data saved in the database.
     * @param {financetransactionCreateManyAndReturnArgs} args - Arguments to create many Financetransactions.
     * @example
     * // Create many Financetransactions
     * const financetransaction = await prisma.financetransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Financetransactions and only return the `id`
     * const financetransactionWithIdOnly = await prisma.financetransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends financetransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, financetransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Financetransaction.
     * @param {financetransactionDeleteArgs} args - Arguments to delete one Financetransaction.
     * @example
     * // Delete one Financetransaction
     * const Financetransaction = await prisma.financetransaction.delete({
     *   where: {
     *     // ... filter to delete one Financetransaction
     *   }
     * })
     * 
     */
    delete<T extends financetransactionDeleteArgs>(args: SelectSubset<T, financetransactionDeleteArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Financetransaction.
     * @param {financetransactionUpdateArgs} args - Arguments to update one Financetransaction.
     * @example
     * // Update one Financetransaction
     * const financetransaction = await prisma.financetransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends financetransactionUpdateArgs>(args: SelectSubset<T, financetransactionUpdateArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Financetransactions.
     * @param {financetransactionDeleteManyArgs} args - Arguments to filter Financetransactions to delete.
     * @example
     * // Delete a few Financetransactions
     * const { count } = await prisma.financetransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends financetransactionDeleteManyArgs>(args?: SelectSubset<T, financetransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Financetransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financetransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Financetransactions
     * const financetransaction = await prisma.financetransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends financetransactionUpdateManyArgs>(args: SelectSubset<T, financetransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Financetransactions and returns the data updated in the database.
     * @param {financetransactionUpdateManyAndReturnArgs} args - Arguments to update many Financetransactions.
     * @example
     * // Update many Financetransactions
     * const financetransaction = await prisma.financetransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Financetransactions and only return the `id`
     * const financetransactionWithIdOnly = await prisma.financetransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends financetransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, financetransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Financetransaction.
     * @param {financetransactionUpsertArgs} args - Arguments to update or create a Financetransaction.
     * @example
     * // Update or create a Financetransaction
     * const financetransaction = await prisma.financetransaction.upsert({
     *   create: {
     *     // ... data to create a Financetransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Financetransaction we want to update
     *   }
     * })
     */
    upsert<T extends financetransactionUpsertArgs>(args: SelectSubset<T, financetransactionUpsertArgs<ExtArgs>>): Prisma__financetransactionClient<$Result.GetResult<Prisma.$financetransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Financetransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financetransactionCountArgs} args - Arguments to filter Financetransactions to count.
     * @example
     * // Count the number of Financetransactions
     * const count = await prisma.financetransaction.count({
     *   where: {
     *     // ... the filter for the Financetransactions we want to count
     *   }
     * })
    **/
    count<T extends financetransactionCountArgs>(
      args?: Subset<T, financetransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinancetransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Financetransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancetransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinancetransactionAggregateArgs>(args: Subset<T, FinancetransactionAggregateArgs>): Prisma.PrismaPromise<GetFinancetransactionAggregateType<T>>

    /**
     * Group by Financetransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {financetransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends financetransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: financetransactionGroupByArgs['orderBy'] }
        : { orderBy?: financetransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, financetransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancetransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the financetransaction model
   */
  readonly fields: financetransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for financetransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__financetransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the financetransaction model
   */
  interface financetransactionFieldRefs {
    readonly id: FieldRef<"financetransaction", 'String'>
    readonly name: FieldRef<"financetransaction", 'String'>
    readonly amount: FieldRef<"financetransaction", 'Float'>
    readonly status: FieldRef<"financetransaction", 'String'>
    readonly date: FieldRef<"financetransaction", 'DateTime'>
    readonly details: FieldRef<"financetransaction", 'String'>
    readonly source: FieldRef<"financetransaction", 'String'>
    readonly fk_user_targetto_in_financetransaction: FieldRef<"financetransaction", 'String'>
    readonly fk_financeaccount_in_financetransaction: FieldRef<"financetransaction", 'String'>
    readonly createdby: FieldRef<"financetransaction", 'String'>
    readonly updatedby: FieldRef<"financetransaction", 'String'>
    readonly createdAt: FieldRef<"financetransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"financetransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * financetransaction findUnique
   */
  export type financetransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * Filter, which financetransaction to fetch.
     */
    where: financetransactionWhereUniqueInput
  }

  /**
   * financetransaction findUniqueOrThrow
   */
  export type financetransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * Filter, which financetransaction to fetch.
     */
    where: financetransactionWhereUniqueInput
  }

  /**
   * financetransaction findFirst
   */
  export type financetransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * Filter, which financetransaction to fetch.
     */
    where?: financetransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financetransactions to fetch.
     */
    orderBy?: financetransactionOrderByWithRelationInput | financetransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for financetransactions.
     */
    cursor?: financetransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financetransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financetransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of financetransactions.
     */
    distinct?: FinancetransactionScalarFieldEnum | FinancetransactionScalarFieldEnum[]
  }

  /**
   * financetransaction findFirstOrThrow
   */
  export type financetransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * Filter, which financetransaction to fetch.
     */
    where?: financetransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financetransactions to fetch.
     */
    orderBy?: financetransactionOrderByWithRelationInput | financetransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for financetransactions.
     */
    cursor?: financetransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financetransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financetransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of financetransactions.
     */
    distinct?: FinancetransactionScalarFieldEnum | FinancetransactionScalarFieldEnum[]
  }

  /**
   * financetransaction findMany
   */
  export type financetransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * Filter, which financetransactions to fetch.
     */
    where?: financetransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of financetransactions to fetch.
     */
    orderBy?: financetransactionOrderByWithRelationInput | financetransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing financetransactions.
     */
    cursor?: financetransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` financetransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` financetransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of financetransactions.
     */
    distinct?: FinancetransactionScalarFieldEnum | FinancetransactionScalarFieldEnum[]
  }

  /**
   * financetransaction create
   */
  export type financetransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a financetransaction.
     */
    data: XOR<financetransactionCreateInput, financetransactionUncheckedCreateInput>
  }

  /**
   * financetransaction createMany
   */
  export type financetransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many financetransactions.
     */
    data: financetransactionCreateManyInput | financetransactionCreateManyInput[]
  }

  /**
   * financetransaction createManyAndReturn
   */
  export type financetransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * The data used to create many financetransactions.
     */
    data: financetransactionCreateManyInput | financetransactionCreateManyInput[]
  }

  /**
   * financetransaction update
   */
  export type financetransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a financetransaction.
     */
    data: XOR<financetransactionUpdateInput, financetransactionUncheckedUpdateInput>
    /**
     * Choose, which financetransaction to update.
     */
    where: financetransactionWhereUniqueInput
  }

  /**
   * financetransaction updateMany
   */
  export type financetransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update financetransactions.
     */
    data: XOR<financetransactionUpdateManyMutationInput, financetransactionUncheckedUpdateManyInput>
    /**
     * Filter which financetransactions to update
     */
    where?: financetransactionWhereInput
    /**
     * Limit how many financetransactions to update.
     */
    limit?: number
  }

  /**
   * financetransaction updateManyAndReturn
   */
  export type financetransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * The data used to update financetransactions.
     */
    data: XOR<financetransactionUpdateManyMutationInput, financetransactionUncheckedUpdateManyInput>
    /**
     * Filter which financetransactions to update
     */
    where?: financetransactionWhereInput
    /**
     * Limit how many financetransactions to update.
     */
    limit?: number
  }

  /**
   * financetransaction upsert
   */
  export type financetransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the financetransaction to update in case it exists.
     */
    where: financetransactionWhereUniqueInput
    /**
     * In case the financetransaction found by the `where` argument doesn't exist, create a new financetransaction with this data.
     */
    create: XOR<financetransactionCreateInput, financetransactionUncheckedCreateInput>
    /**
     * In case the financetransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<financetransactionUpdateInput, financetransactionUncheckedUpdateInput>
  }

  /**
   * financetransaction delete
   */
  export type financetransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
    /**
     * Filter which financetransaction to delete.
     */
    where: financetransactionWhereUniqueInput
  }

  /**
   * financetransaction deleteMany
   */
  export type financetransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which financetransactions to delete
     */
    where?: financetransactionWhereInput
    /**
     * Limit how many financetransactions to delete.
     */
    limit?: number
  }

  /**
   * financetransaction without action
   */
  export type financetransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the financetransaction
     */
    select?: financetransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the financetransaction
     */
    omit?: financetransactionOmit<ExtArgs> | null
  }


  /**
   * Model inventorylogs
   */

  export type AggregateInventorylogs = {
    _count: InventorylogsCountAggregateOutputType | null
    _avg: InventorylogsAvgAggregateOutputType | null
    _sum: InventorylogsSumAggregateOutputType | null
    _min: InventorylogsMinAggregateOutputType | null
    _max: InventorylogsMaxAggregateOutputType | null
  }

  export type InventorylogsAvgAggregateOutputType = {
    quantity: number | null
  }

  export type InventorylogsSumAggregateOutputType = {
    quantity: number | null
  }

  export type InventorylogsMinAggregateOutputType = {
    id: string | null
    product_id: string | null
    quantity: number | null
    note: string | null
    createdby: string | null
    type: string | null
    vendor: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventorylogsMaxAggregateOutputType = {
    id: string | null
    product_id: string | null
    quantity: number | null
    note: string | null
    createdby: string | null
    type: string | null
    vendor: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventorylogsCountAggregateOutputType = {
    id: number
    product_id: number
    quantity: number
    note: number
    createdby: number
    type: number
    vendor: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InventorylogsAvgAggregateInputType = {
    quantity?: true
  }

  export type InventorylogsSumAggregateInputType = {
    quantity?: true
  }

  export type InventorylogsMinAggregateInputType = {
    id?: true
    product_id?: true
    quantity?: true
    note?: true
    createdby?: true
    type?: true
    vendor?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventorylogsMaxAggregateInputType = {
    id?: true
    product_id?: true
    quantity?: true
    note?: true
    createdby?: true
    type?: true
    vendor?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventorylogsCountAggregateInputType = {
    id?: true
    product_id?: true
    quantity?: true
    note?: true
    createdby?: true
    type?: true
    vendor?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InventorylogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which inventorylogs to aggregate.
     */
    where?: inventorylogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventorylogs to fetch.
     */
    orderBy?: inventorylogsOrderByWithRelationInput | inventorylogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: inventorylogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventorylogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventorylogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned inventorylogs
    **/
    _count?: true | InventorylogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventorylogsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventorylogsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventorylogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventorylogsMaxAggregateInputType
  }

  export type GetInventorylogsAggregateType<T extends InventorylogsAggregateArgs> = {
        [P in keyof T & keyof AggregateInventorylogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventorylogs[P]>
      : GetScalarType<T[P], AggregateInventorylogs[P]>
  }




  export type inventorylogsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: inventorylogsWhereInput
    orderBy?: inventorylogsOrderByWithAggregationInput | inventorylogsOrderByWithAggregationInput[]
    by: InventorylogsScalarFieldEnum[] | InventorylogsScalarFieldEnum
    having?: inventorylogsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventorylogsCountAggregateInputType | true
    _avg?: InventorylogsAvgAggregateInputType
    _sum?: InventorylogsSumAggregateInputType
    _min?: InventorylogsMinAggregateInputType
    _max?: InventorylogsMaxAggregateInputType
  }

  export type InventorylogsGroupByOutputType = {
    id: string
    product_id: string
    quantity: number
    note: string | null
    createdby: string
    type: string
    vendor: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: InventorylogsCountAggregateOutputType | null
    _avg: InventorylogsAvgAggregateOutputType | null
    _sum: InventorylogsSumAggregateOutputType | null
    _min: InventorylogsMinAggregateOutputType | null
    _max: InventorylogsMaxAggregateOutputType | null
  }

  type GetInventorylogsGroupByPayload<T extends inventorylogsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventorylogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventorylogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventorylogsGroupByOutputType[P]>
            : GetScalarType<T[P], InventorylogsGroupByOutputType[P]>
        }
      >
    >


  export type inventorylogsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_id?: boolean
    quantity?: boolean
    note?: boolean
    createdby?: boolean
    type?: boolean
    vendor?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["inventorylogs"]>

  export type inventorylogsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_id?: boolean
    quantity?: boolean
    note?: boolean
    createdby?: boolean
    type?: boolean
    vendor?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["inventorylogs"]>

  export type inventorylogsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_id?: boolean
    quantity?: boolean
    note?: boolean
    createdby?: boolean
    type?: boolean
    vendor?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["inventorylogs"]>

  export type inventorylogsSelectScalar = {
    id?: boolean
    product_id?: boolean
    quantity?: boolean
    note?: boolean
    createdby?: boolean
    type?: boolean
    vendor?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type inventorylogsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "product_id" | "quantity" | "note" | "createdby" | "type" | "vendor" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["inventorylogs"]>

  export type $inventorylogsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "inventorylogs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      product_id: string
      quantity: number
      note: string | null
      createdby: string
      type: string
      vendor: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inventorylogs"]>
    composites: {}
  }

  type inventorylogsGetPayload<S extends boolean | null | undefined | inventorylogsDefaultArgs> = $Result.GetResult<Prisma.$inventorylogsPayload, S>

  type inventorylogsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<inventorylogsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InventorylogsCountAggregateInputType | true
    }

  export interface inventorylogsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['inventorylogs'], meta: { name: 'inventorylogs' } }
    /**
     * Find zero or one Inventorylogs that matches the filter.
     * @param {inventorylogsFindUniqueArgs} args - Arguments to find a Inventorylogs
     * @example
     * // Get one Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends inventorylogsFindUniqueArgs>(args: SelectSubset<T, inventorylogsFindUniqueArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inventorylogs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {inventorylogsFindUniqueOrThrowArgs} args - Arguments to find a Inventorylogs
     * @example
     * // Get one Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends inventorylogsFindUniqueOrThrowArgs>(args: SelectSubset<T, inventorylogsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inventorylogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventorylogsFindFirstArgs} args - Arguments to find a Inventorylogs
     * @example
     * // Get one Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends inventorylogsFindFirstArgs>(args?: SelectSubset<T, inventorylogsFindFirstArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inventorylogs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventorylogsFindFirstOrThrowArgs} args - Arguments to find a Inventorylogs
     * @example
     * // Get one Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends inventorylogsFindFirstOrThrowArgs>(args?: SelectSubset<T, inventorylogsFindFirstOrThrowArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inventorylogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventorylogsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.findMany()
     * 
     * // Get first 10 Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventorylogsWithIdOnly = await prisma.inventorylogs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends inventorylogsFindManyArgs>(args?: SelectSubset<T, inventorylogsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inventorylogs.
     * @param {inventorylogsCreateArgs} args - Arguments to create a Inventorylogs.
     * @example
     * // Create one Inventorylogs
     * const Inventorylogs = await prisma.inventorylogs.create({
     *   data: {
     *     // ... data to create a Inventorylogs
     *   }
     * })
     * 
     */
    create<T extends inventorylogsCreateArgs>(args: SelectSubset<T, inventorylogsCreateArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inventorylogs.
     * @param {inventorylogsCreateManyArgs} args - Arguments to create many Inventorylogs.
     * @example
     * // Create many Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends inventorylogsCreateManyArgs>(args?: SelectSubset<T, inventorylogsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inventorylogs and returns the data saved in the database.
     * @param {inventorylogsCreateManyAndReturnArgs} args - Arguments to create many Inventorylogs.
     * @example
     * // Create many Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inventorylogs and only return the `id`
     * const inventorylogsWithIdOnly = await prisma.inventorylogs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends inventorylogsCreateManyAndReturnArgs>(args?: SelectSubset<T, inventorylogsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inventorylogs.
     * @param {inventorylogsDeleteArgs} args - Arguments to delete one Inventorylogs.
     * @example
     * // Delete one Inventorylogs
     * const Inventorylogs = await prisma.inventorylogs.delete({
     *   where: {
     *     // ... filter to delete one Inventorylogs
     *   }
     * })
     * 
     */
    delete<T extends inventorylogsDeleteArgs>(args: SelectSubset<T, inventorylogsDeleteArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inventorylogs.
     * @param {inventorylogsUpdateArgs} args - Arguments to update one Inventorylogs.
     * @example
     * // Update one Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends inventorylogsUpdateArgs>(args: SelectSubset<T, inventorylogsUpdateArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inventorylogs.
     * @param {inventorylogsDeleteManyArgs} args - Arguments to filter Inventorylogs to delete.
     * @example
     * // Delete a few Inventorylogs
     * const { count } = await prisma.inventorylogs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends inventorylogsDeleteManyArgs>(args?: SelectSubset<T, inventorylogsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventorylogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventorylogsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends inventorylogsUpdateManyArgs>(args: SelectSubset<T, inventorylogsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventorylogs and returns the data updated in the database.
     * @param {inventorylogsUpdateManyAndReturnArgs} args - Arguments to update many Inventorylogs.
     * @example
     * // Update many Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inventorylogs and only return the `id`
     * const inventorylogsWithIdOnly = await prisma.inventorylogs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends inventorylogsUpdateManyAndReturnArgs>(args: SelectSubset<T, inventorylogsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inventorylogs.
     * @param {inventorylogsUpsertArgs} args - Arguments to update or create a Inventorylogs.
     * @example
     * // Update or create a Inventorylogs
     * const inventorylogs = await prisma.inventorylogs.upsert({
     *   create: {
     *     // ... data to create a Inventorylogs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inventorylogs we want to update
     *   }
     * })
     */
    upsert<T extends inventorylogsUpsertArgs>(args: SelectSubset<T, inventorylogsUpsertArgs<ExtArgs>>): Prisma__inventorylogsClient<$Result.GetResult<Prisma.$inventorylogsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inventorylogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventorylogsCountArgs} args - Arguments to filter Inventorylogs to count.
     * @example
     * // Count the number of Inventorylogs
     * const count = await prisma.inventorylogs.count({
     *   where: {
     *     // ... the filter for the Inventorylogs we want to count
     *   }
     * })
    **/
    count<T extends inventorylogsCountArgs>(
      args?: Subset<T, inventorylogsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventorylogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inventorylogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventorylogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventorylogsAggregateArgs>(args: Subset<T, InventorylogsAggregateArgs>): Prisma.PrismaPromise<GetInventorylogsAggregateType<T>>

    /**
     * Group by Inventorylogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventorylogsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends inventorylogsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: inventorylogsGroupByArgs['orderBy'] }
        : { orderBy?: inventorylogsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, inventorylogsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventorylogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the inventorylogs model
   */
  readonly fields: inventorylogsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for inventorylogs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__inventorylogsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the inventorylogs model
   */
  interface inventorylogsFieldRefs {
    readonly id: FieldRef<"inventorylogs", 'String'>
    readonly product_id: FieldRef<"inventorylogs", 'String'>
    readonly quantity: FieldRef<"inventorylogs", 'Int'>
    readonly note: FieldRef<"inventorylogs", 'String'>
    readonly createdby: FieldRef<"inventorylogs", 'String'>
    readonly type: FieldRef<"inventorylogs", 'String'>
    readonly vendor: FieldRef<"inventorylogs", 'String'>
    readonly source: FieldRef<"inventorylogs", 'String'>
    readonly createdAt: FieldRef<"inventorylogs", 'DateTime'>
    readonly updatedAt: FieldRef<"inventorylogs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * inventorylogs findUnique
   */
  export type inventorylogsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * Filter, which inventorylogs to fetch.
     */
    where: inventorylogsWhereUniqueInput
  }

  /**
   * inventorylogs findUniqueOrThrow
   */
  export type inventorylogsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * Filter, which inventorylogs to fetch.
     */
    where: inventorylogsWhereUniqueInput
  }

  /**
   * inventorylogs findFirst
   */
  export type inventorylogsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * Filter, which inventorylogs to fetch.
     */
    where?: inventorylogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventorylogs to fetch.
     */
    orderBy?: inventorylogsOrderByWithRelationInput | inventorylogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for inventorylogs.
     */
    cursor?: inventorylogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventorylogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventorylogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of inventorylogs.
     */
    distinct?: InventorylogsScalarFieldEnum | InventorylogsScalarFieldEnum[]
  }

  /**
   * inventorylogs findFirstOrThrow
   */
  export type inventorylogsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * Filter, which inventorylogs to fetch.
     */
    where?: inventorylogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventorylogs to fetch.
     */
    orderBy?: inventorylogsOrderByWithRelationInput | inventorylogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for inventorylogs.
     */
    cursor?: inventorylogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventorylogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventorylogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of inventorylogs.
     */
    distinct?: InventorylogsScalarFieldEnum | InventorylogsScalarFieldEnum[]
  }

  /**
   * inventorylogs findMany
   */
  export type inventorylogsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * Filter, which inventorylogs to fetch.
     */
    where?: inventorylogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventorylogs to fetch.
     */
    orderBy?: inventorylogsOrderByWithRelationInput | inventorylogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing inventorylogs.
     */
    cursor?: inventorylogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventorylogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventorylogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of inventorylogs.
     */
    distinct?: InventorylogsScalarFieldEnum | InventorylogsScalarFieldEnum[]
  }

  /**
   * inventorylogs create
   */
  export type inventorylogsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * The data needed to create a inventorylogs.
     */
    data: XOR<inventorylogsCreateInput, inventorylogsUncheckedCreateInput>
  }

  /**
   * inventorylogs createMany
   */
  export type inventorylogsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many inventorylogs.
     */
    data: inventorylogsCreateManyInput | inventorylogsCreateManyInput[]
  }

  /**
   * inventorylogs createManyAndReturn
   */
  export type inventorylogsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * The data used to create many inventorylogs.
     */
    data: inventorylogsCreateManyInput | inventorylogsCreateManyInput[]
  }

  /**
   * inventorylogs update
   */
  export type inventorylogsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * The data needed to update a inventorylogs.
     */
    data: XOR<inventorylogsUpdateInput, inventorylogsUncheckedUpdateInput>
    /**
     * Choose, which inventorylogs to update.
     */
    where: inventorylogsWhereUniqueInput
  }

  /**
   * inventorylogs updateMany
   */
  export type inventorylogsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update inventorylogs.
     */
    data: XOR<inventorylogsUpdateManyMutationInput, inventorylogsUncheckedUpdateManyInput>
    /**
     * Filter which inventorylogs to update
     */
    where?: inventorylogsWhereInput
    /**
     * Limit how many inventorylogs to update.
     */
    limit?: number
  }

  /**
   * inventorylogs updateManyAndReturn
   */
  export type inventorylogsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * The data used to update inventorylogs.
     */
    data: XOR<inventorylogsUpdateManyMutationInput, inventorylogsUncheckedUpdateManyInput>
    /**
     * Filter which inventorylogs to update
     */
    where?: inventorylogsWhereInput
    /**
     * Limit how many inventorylogs to update.
     */
    limit?: number
  }

  /**
   * inventorylogs upsert
   */
  export type inventorylogsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * The filter to search for the inventorylogs to update in case it exists.
     */
    where: inventorylogsWhereUniqueInput
    /**
     * In case the inventorylogs found by the `where` argument doesn't exist, create a new inventorylogs with this data.
     */
    create: XOR<inventorylogsCreateInput, inventorylogsUncheckedCreateInput>
    /**
     * In case the inventorylogs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<inventorylogsUpdateInput, inventorylogsUncheckedUpdateInput>
  }

  /**
   * inventorylogs delete
   */
  export type inventorylogsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
    /**
     * Filter which inventorylogs to delete.
     */
    where: inventorylogsWhereUniqueInput
  }

  /**
   * inventorylogs deleteMany
   */
  export type inventorylogsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which inventorylogs to delete
     */
    where?: inventorylogsWhereInput
    /**
     * Limit how many inventorylogs to delete.
     */
    limit?: number
  }

  /**
   * inventorylogs without action
   */
  export type inventorylogsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventorylogs
     */
    select?: inventorylogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventorylogs
     */
    omit?: inventorylogsOmit<ExtArgs> | null
  }


  /**
   * Model product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    carrycost: number | null
    discount: number | null
    purchaseprice: number | null
    quantity: number | null
    saleprice: number | null
  }

  export type ProductSumAggregateOutputType = {
    carrycost: number | null
    discount: number | null
    purchaseprice: number | null
    quantity: number | null
    saleprice: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    barcode: string | null
    brand: string | null
    carrycost: number | null
    category: string | null
    discount: number | null
    ispurchaseable: boolean | null
    issaleable: boolean | null
    name: string | null
    purchaseactive: boolean | null
    purchaseprice: number | null
    quantity: number | null
    saleactive: boolean | null
    saleprice: number | null
    taxid: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    barcode: string | null
    brand: string | null
    carrycost: number | null
    category: string | null
    discount: number | null
    ispurchaseable: boolean | null
    issaleable: boolean | null
    name: string | null
    purchaseactive: boolean | null
    purchaseprice: number | null
    quantity: number | null
    saleactive: boolean | null
    saleprice: number | null
    taxid: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    barcode: number
    brand: number
    carrycost: number
    category: number
    discount: number
    ispurchaseable: number
    issaleable: number
    name: number
    purchaseactive: number
    purchaseprice: number
    quantity: number
    saleactive: number
    saleprice: number
    taxid: number
    createdby: number
    updatedby: number
    source: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    carrycost?: true
    discount?: true
    purchaseprice?: true
    quantity?: true
    saleprice?: true
  }

  export type ProductSumAggregateInputType = {
    carrycost?: true
    discount?: true
    purchaseprice?: true
    quantity?: true
    saleprice?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    barcode?: true
    brand?: true
    carrycost?: true
    category?: true
    discount?: true
    ispurchaseable?: true
    issaleable?: true
    name?: true
    purchaseactive?: true
    purchaseprice?: true
    quantity?: true
    saleactive?: true
    saleprice?: true
    taxid?: true
    createdby?: true
    updatedby?: true
    source?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    barcode?: true
    brand?: true
    carrycost?: true
    category?: true
    discount?: true
    ispurchaseable?: true
    issaleable?: true
    name?: true
    purchaseactive?: true
    purchaseprice?: true
    quantity?: true
    saleactive?: true
    saleprice?: true
    taxid?: true
    createdby?: true
    updatedby?: true
    source?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    barcode?: true
    brand?: true
    carrycost?: true
    category?: true
    discount?: true
    ispurchaseable?: true
    issaleable?: true
    name?: true
    purchaseactive?: true
    purchaseprice?: true
    quantity?: true
    saleactive?: true
    saleprice?: true
    taxid?: true
    createdby?: true
    updatedby?: true
    source?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which product to aggregate.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type productGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productWhereInput
    orderBy?: productOrderByWithAggregationInput | productOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: productScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    barcode: string | null
    brand: string | null
    carrycost: number | null
    category: string | null
    discount: number | null
    ispurchaseable: boolean | null
    issaleable: boolean | null
    name: string | null
    purchaseactive: boolean | null
    purchaseprice: number | null
    quantity: number | null
    saleactive: boolean | null
    saleprice: number | null
    taxid: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends productGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type productSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    brand?: boolean
    carrycost?: boolean
    category?: boolean
    discount?: boolean
    ispurchaseable?: boolean
    issaleable?: boolean
    name?: boolean
    purchaseactive?: boolean
    purchaseprice?: boolean
    quantity?: boolean
    saleactive?: boolean
    saleprice?: boolean
    taxid?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
  }, ExtArgs["result"]["product"]>

  export type productSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    brand?: boolean
    carrycost?: boolean
    category?: boolean
    discount?: boolean
    ispurchaseable?: boolean
    issaleable?: boolean
    name?: boolean
    purchaseactive?: boolean
    purchaseprice?: boolean
    quantity?: boolean
    saleactive?: boolean
    saleprice?: boolean
    taxid?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
  }, ExtArgs["result"]["product"]>

  export type productSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    brand?: boolean
    carrycost?: boolean
    category?: boolean
    discount?: boolean
    ispurchaseable?: boolean
    issaleable?: boolean
    name?: boolean
    purchaseactive?: boolean
    purchaseprice?: boolean
    quantity?: boolean
    saleactive?: boolean
    saleprice?: boolean
    taxid?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
  }, ExtArgs["result"]["product"]>

  export type productSelectScalar = {
    id?: boolean
    barcode?: boolean
    brand?: boolean
    carrycost?: boolean
    category?: boolean
    discount?: boolean
    ispurchaseable?: boolean
    issaleable?: boolean
    name?: boolean
    purchaseactive?: boolean
    purchaseprice?: boolean
    quantity?: boolean
    saleactive?: boolean
    saleprice?: boolean
    taxid?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
  }

  export type productOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barcode" | "brand" | "carrycost" | "category" | "discount" | "ispurchaseable" | "issaleable" | "name" | "purchaseactive" | "purchaseprice" | "quantity" | "saleactive" | "saleprice" | "taxid" | "createdby" | "updatedby" | "source", ExtArgs["result"]["product"]>

  export type $productPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barcode: string | null
      brand: string | null
      carrycost: number | null
      category: string | null
      discount: number | null
      ispurchaseable: boolean | null
      issaleable: boolean | null
      name: string | null
      purchaseactive: boolean | null
      purchaseprice: number | null
      quantity: number | null
      saleactive: boolean | null
      saleprice: number | null
      taxid: string | null
      createdby: string | null
      updatedby: string | null
      source: string | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type productGetPayload<S extends boolean | null | undefined | productDefaultArgs> = $Result.GetResult<Prisma.$productPayload, S>

  type productCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface productDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['product'], meta: { name: 'product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {productFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productFindUniqueArgs>(args: SelectSubset<T, productFindUniqueArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productFindUniqueOrThrowArgs>(args: SelectSubset<T, productFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productFindFirstArgs>(args?: SelectSubset<T, productFindFirstArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productFindFirstOrThrowArgs>(args?: SelectSubset<T, productFindFirstOrThrowArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productFindManyArgs>(args?: SelectSubset<T, productFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {productCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends productCreateArgs>(args: SelectSubset<T, productCreateArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {productCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productCreateManyArgs>(args?: SelectSubset<T, productCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {productCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productCreateManyAndReturnArgs>(args?: SelectSubset<T, productCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {productDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends productDeleteArgs>(args: SelectSubset<T, productDeleteArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {productUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productUpdateArgs>(args: SelectSubset<T, productUpdateArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {productDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productDeleteManyArgs>(args?: SelectSubset<T, productDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productUpdateManyArgs>(args: SelectSubset<T, productUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {productUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productUpdateManyAndReturnArgs>(args: SelectSubset<T, productUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {productUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends productUpsertArgs>(args: SelectSubset<T, productUpsertArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends productCountArgs>(
      args?: Subset<T, productCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productGroupByArgs['orderBy'] }
        : { orderBy?: productGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the product model
   */
  readonly fields: productFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the product model
   */
  interface productFieldRefs {
    readonly id: FieldRef<"product", 'String'>
    readonly barcode: FieldRef<"product", 'String'>
    readonly brand: FieldRef<"product", 'String'>
    readonly carrycost: FieldRef<"product", 'Float'>
    readonly category: FieldRef<"product", 'String'>
    readonly discount: FieldRef<"product", 'Float'>
    readonly ispurchaseable: FieldRef<"product", 'Boolean'>
    readonly issaleable: FieldRef<"product", 'Boolean'>
    readonly name: FieldRef<"product", 'String'>
    readonly purchaseactive: FieldRef<"product", 'Boolean'>
    readonly purchaseprice: FieldRef<"product", 'Float'>
    readonly quantity: FieldRef<"product", 'Float'>
    readonly saleactive: FieldRef<"product", 'Boolean'>
    readonly saleprice: FieldRef<"product", 'Float'>
    readonly taxid: FieldRef<"product", 'String'>
    readonly createdby: FieldRef<"product", 'String'>
    readonly updatedby: FieldRef<"product", 'String'>
    readonly source: FieldRef<"product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * product findUnique
   */
  export type productFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where: productWhereUniqueInput
  }

  /**
   * product findUniqueOrThrow
   */
  export type productFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where: productWhereUniqueInput
  }

  /**
   * product findFirst
   */
  export type productFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for products.
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * product findFirstOrThrow
   */
  export type productFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for products.
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * product findMany
   */
  export type productFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing products.
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * product create
   */
  export type productCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data needed to create a product.
     */
    data: XOR<productCreateInput, productUncheckedCreateInput>
  }

  /**
   * product createMany
   */
  export type productCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many products.
     */
    data: productCreateManyInput | productCreateManyInput[]
  }

  /**
   * product createManyAndReturn
   */
  export type productCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data used to create many products.
     */
    data: productCreateManyInput | productCreateManyInput[]
  }

  /**
   * product update
   */
  export type productUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data needed to update a product.
     */
    data: XOR<productUpdateInput, productUncheckedUpdateInput>
    /**
     * Choose, which product to update.
     */
    where: productWhereUniqueInput
  }

  /**
   * product updateMany
   */
  export type productUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update products.
     */
    data: XOR<productUpdateManyMutationInput, productUncheckedUpdateManyInput>
    /**
     * Filter which products to update
     */
    where?: productWhereInput
    /**
     * Limit how many products to update.
     */
    limit?: number
  }

  /**
   * product updateManyAndReturn
   */
  export type productUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data used to update products.
     */
    data: XOR<productUpdateManyMutationInput, productUncheckedUpdateManyInput>
    /**
     * Filter which products to update
     */
    where?: productWhereInput
    /**
     * Limit how many products to update.
     */
    limit?: number
  }

  /**
   * product upsert
   */
  export type productUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The filter to search for the product to update in case it exists.
     */
    where: productWhereUniqueInput
    /**
     * In case the product found by the `where` argument doesn't exist, create a new product with this data.
     */
    create: XOR<productCreateInput, productUncheckedCreateInput>
    /**
     * In case the product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productUpdateInput, productUncheckedUpdateInput>
  }

  /**
   * product delete
   */
  export type productDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter which product to delete.
     */
    where: productWhereUniqueInput
  }

  /**
   * product deleteMany
   */
  export type productDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which products to delete
     */
    where?: productWhereInput
    /**
     * Limit how many products to delete.
     */
    limit?: number
  }

  /**
   * product without action
   */
  export type productDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
  }


  /**
   * Model productbatches
   */

  export type AggregateProductbatches = {
    _count: ProductbatchesCountAggregateOutputType | null
    _avg: ProductbatchesAvgAggregateOutputType | null
    _sum: ProductbatchesSumAggregateOutputType | null
    _min: ProductbatchesMinAggregateOutputType | null
    _max: ProductbatchesMaxAggregateOutputType | null
  }

  export type ProductbatchesAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ProductbatchesSumAggregateOutputType = {
    quantity: number | null
  }

  export type ProductbatchesMinAggregateOutputType = {
    id: string | null
    product: string | null
    expirydate: Date | null
    quantity: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductbatchesMaxAggregateOutputType = {
    id: string | null
    product: string | null
    expirydate: Date | null
    quantity: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductbatchesCountAggregateOutputType = {
    id: number
    product: number
    expirydate: number
    quantity: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductbatchesAvgAggregateInputType = {
    quantity?: true
  }

  export type ProductbatchesSumAggregateInputType = {
    quantity?: true
  }

  export type ProductbatchesMinAggregateInputType = {
    id?: true
    product?: true
    expirydate?: true
    quantity?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductbatchesMaxAggregateInputType = {
    id?: true
    product?: true
    expirydate?: true
    quantity?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductbatchesCountAggregateInputType = {
    id?: true
    product?: true
    expirydate?: true
    quantity?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductbatchesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productbatches to aggregate.
     */
    where?: productbatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productbatches to fetch.
     */
    orderBy?: productbatchesOrderByWithRelationInput | productbatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productbatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productbatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productbatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned productbatches
    **/
    _count?: true | ProductbatchesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductbatchesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductbatchesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductbatchesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductbatchesMaxAggregateInputType
  }

  export type GetProductbatchesAggregateType<T extends ProductbatchesAggregateArgs> = {
        [P in keyof T & keyof AggregateProductbatches]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductbatches[P]>
      : GetScalarType<T[P], AggregateProductbatches[P]>
  }




  export type productbatchesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productbatchesWhereInput
    orderBy?: productbatchesOrderByWithAggregationInput | productbatchesOrderByWithAggregationInput[]
    by: ProductbatchesScalarFieldEnum[] | ProductbatchesScalarFieldEnum
    having?: productbatchesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductbatchesCountAggregateInputType | true
    _avg?: ProductbatchesAvgAggregateInputType
    _sum?: ProductbatchesSumAggregateInputType
    _min?: ProductbatchesMinAggregateInputType
    _max?: ProductbatchesMaxAggregateInputType
  }

  export type ProductbatchesGroupByOutputType = {
    id: string
    product: string | null
    expirydate: Date | null
    quantity: number | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductbatchesCountAggregateOutputType | null
    _avg: ProductbatchesAvgAggregateOutputType | null
    _sum: ProductbatchesSumAggregateOutputType | null
    _min: ProductbatchesMinAggregateOutputType | null
    _max: ProductbatchesMaxAggregateOutputType | null
  }

  type GetProductbatchesGroupByPayload<T extends productbatchesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductbatchesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductbatchesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductbatchesGroupByOutputType[P]>
            : GetScalarType<T[P], ProductbatchesGroupByOutputType[P]>
        }
      >
    >


  export type productbatchesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product?: boolean
    expirydate?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productbatches"]>

  export type productbatchesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product?: boolean
    expirydate?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productbatches"]>

  export type productbatchesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product?: boolean
    expirydate?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productbatches"]>

  export type productbatchesSelectScalar = {
    id?: boolean
    product?: boolean
    expirydate?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type productbatchesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "product" | "expirydate" | "quantity" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["productbatches"]>

  export type $productbatchesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "productbatches"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      product: string | null
      expirydate: Date | null
      quantity: number | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productbatches"]>
    composites: {}
  }

  type productbatchesGetPayload<S extends boolean | null | undefined | productbatchesDefaultArgs> = $Result.GetResult<Prisma.$productbatchesPayload, S>

  type productbatchesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productbatchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductbatchesCountAggregateInputType | true
    }

  export interface productbatchesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['productbatches'], meta: { name: 'productbatches' } }
    /**
     * Find zero or one Productbatches that matches the filter.
     * @param {productbatchesFindUniqueArgs} args - Arguments to find a Productbatches
     * @example
     * // Get one Productbatches
     * const productbatches = await prisma.productbatches.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productbatchesFindUniqueArgs>(args: SelectSubset<T, productbatchesFindUniqueArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Productbatches that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productbatchesFindUniqueOrThrowArgs} args - Arguments to find a Productbatches
     * @example
     * // Get one Productbatches
     * const productbatches = await prisma.productbatches.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productbatchesFindUniqueOrThrowArgs>(args: SelectSubset<T, productbatchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productbatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productbatchesFindFirstArgs} args - Arguments to find a Productbatches
     * @example
     * // Get one Productbatches
     * const productbatches = await prisma.productbatches.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productbatchesFindFirstArgs>(args?: SelectSubset<T, productbatchesFindFirstArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productbatches that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productbatchesFindFirstOrThrowArgs} args - Arguments to find a Productbatches
     * @example
     * // Get one Productbatches
     * const productbatches = await prisma.productbatches.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productbatchesFindFirstOrThrowArgs>(args?: SelectSubset<T, productbatchesFindFirstOrThrowArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productbatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productbatchesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productbatches
     * const productbatches = await prisma.productbatches.findMany()
     * 
     * // Get first 10 Productbatches
     * const productbatches = await prisma.productbatches.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productbatchesWithIdOnly = await prisma.productbatches.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productbatchesFindManyArgs>(args?: SelectSubset<T, productbatchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Productbatches.
     * @param {productbatchesCreateArgs} args - Arguments to create a Productbatches.
     * @example
     * // Create one Productbatches
     * const Productbatches = await prisma.productbatches.create({
     *   data: {
     *     // ... data to create a Productbatches
     *   }
     * })
     * 
     */
    create<T extends productbatchesCreateArgs>(args: SelectSubset<T, productbatchesCreateArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productbatches.
     * @param {productbatchesCreateManyArgs} args - Arguments to create many Productbatches.
     * @example
     * // Create many Productbatches
     * const productbatches = await prisma.productbatches.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productbatchesCreateManyArgs>(args?: SelectSubset<T, productbatchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productbatches and returns the data saved in the database.
     * @param {productbatchesCreateManyAndReturnArgs} args - Arguments to create many Productbatches.
     * @example
     * // Create many Productbatches
     * const productbatches = await prisma.productbatches.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productbatches and only return the `id`
     * const productbatchesWithIdOnly = await prisma.productbatches.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productbatchesCreateManyAndReturnArgs>(args?: SelectSubset<T, productbatchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Productbatches.
     * @param {productbatchesDeleteArgs} args - Arguments to delete one Productbatches.
     * @example
     * // Delete one Productbatches
     * const Productbatches = await prisma.productbatches.delete({
     *   where: {
     *     // ... filter to delete one Productbatches
     *   }
     * })
     * 
     */
    delete<T extends productbatchesDeleteArgs>(args: SelectSubset<T, productbatchesDeleteArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Productbatches.
     * @param {productbatchesUpdateArgs} args - Arguments to update one Productbatches.
     * @example
     * // Update one Productbatches
     * const productbatches = await prisma.productbatches.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productbatchesUpdateArgs>(args: SelectSubset<T, productbatchesUpdateArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productbatches.
     * @param {productbatchesDeleteManyArgs} args - Arguments to filter Productbatches to delete.
     * @example
     * // Delete a few Productbatches
     * const { count } = await prisma.productbatches.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productbatchesDeleteManyArgs>(args?: SelectSubset<T, productbatchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productbatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productbatchesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productbatches
     * const productbatches = await prisma.productbatches.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productbatchesUpdateManyArgs>(args: SelectSubset<T, productbatchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productbatches and returns the data updated in the database.
     * @param {productbatchesUpdateManyAndReturnArgs} args - Arguments to update many Productbatches.
     * @example
     * // Update many Productbatches
     * const productbatches = await prisma.productbatches.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productbatches and only return the `id`
     * const productbatchesWithIdOnly = await prisma.productbatches.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productbatchesUpdateManyAndReturnArgs>(args: SelectSubset<T, productbatchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Productbatches.
     * @param {productbatchesUpsertArgs} args - Arguments to update or create a Productbatches.
     * @example
     * // Update or create a Productbatches
     * const productbatches = await prisma.productbatches.upsert({
     *   create: {
     *     // ... data to create a Productbatches
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Productbatches we want to update
     *   }
     * })
     */
    upsert<T extends productbatchesUpsertArgs>(args: SelectSubset<T, productbatchesUpsertArgs<ExtArgs>>): Prisma__productbatchesClient<$Result.GetResult<Prisma.$productbatchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productbatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productbatchesCountArgs} args - Arguments to filter Productbatches to count.
     * @example
     * // Count the number of Productbatches
     * const count = await prisma.productbatches.count({
     *   where: {
     *     // ... the filter for the Productbatches we want to count
     *   }
     * })
    **/
    count<T extends productbatchesCountArgs>(
      args?: Subset<T, productbatchesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductbatchesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Productbatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductbatchesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductbatchesAggregateArgs>(args: Subset<T, ProductbatchesAggregateArgs>): Prisma.PrismaPromise<GetProductbatchesAggregateType<T>>

    /**
     * Group by Productbatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productbatchesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productbatchesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productbatchesGroupByArgs['orderBy'] }
        : { orderBy?: productbatchesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productbatchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductbatchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the productbatches model
   */
  readonly fields: productbatchesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for productbatches.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productbatchesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the productbatches model
   */
  interface productbatchesFieldRefs {
    readonly id: FieldRef<"productbatches", 'String'>
    readonly product: FieldRef<"productbatches", 'String'>
    readonly expirydate: FieldRef<"productbatches", 'DateTime'>
    readonly quantity: FieldRef<"productbatches", 'Float'>
    readonly source: FieldRef<"productbatches", 'String'>
    readonly createdAt: FieldRef<"productbatches", 'DateTime'>
    readonly updatedAt: FieldRef<"productbatches", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * productbatches findUnique
   */
  export type productbatchesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * Filter, which productbatches to fetch.
     */
    where: productbatchesWhereUniqueInput
  }

  /**
   * productbatches findUniqueOrThrow
   */
  export type productbatchesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * Filter, which productbatches to fetch.
     */
    where: productbatchesWhereUniqueInput
  }

  /**
   * productbatches findFirst
   */
  export type productbatchesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * Filter, which productbatches to fetch.
     */
    where?: productbatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productbatches to fetch.
     */
    orderBy?: productbatchesOrderByWithRelationInput | productbatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productbatches.
     */
    cursor?: productbatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productbatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productbatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productbatches.
     */
    distinct?: ProductbatchesScalarFieldEnum | ProductbatchesScalarFieldEnum[]
  }

  /**
   * productbatches findFirstOrThrow
   */
  export type productbatchesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * Filter, which productbatches to fetch.
     */
    where?: productbatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productbatches to fetch.
     */
    orderBy?: productbatchesOrderByWithRelationInput | productbatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productbatches.
     */
    cursor?: productbatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productbatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productbatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productbatches.
     */
    distinct?: ProductbatchesScalarFieldEnum | ProductbatchesScalarFieldEnum[]
  }

  /**
   * productbatches findMany
   */
  export type productbatchesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * Filter, which productbatches to fetch.
     */
    where?: productbatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productbatches to fetch.
     */
    orderBy?: productbatchesOrderByWithRelationInput | productbatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing productbatches.
     */
    cursor?: productbatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productbatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productbatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productbatches.
     */
    distinct?: ProductbatchesScalarFieldEnum | ProductbatchesScalarFieldEnum[]
  }

  /**
   * productbatches create
   */
  export type productbatchesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * The data needed to create a productbatches.
     */
    data: XOR<productbatchesCreateInput, productbatchesUncheckedCreateInput>
  }

  /**
   * productbatches createMany
   */
  export type productbatchesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many productbatches.
     */
    data: productbatchesCreateManyInput | productbatchesCreateManyInput[]
  }

  /**
   * productbatches createManyAndReturn
   */
  export type productbatchesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * The data used to create many productbatches.
     */
    data: productbatchesCreateManyInput | productbatchesCreateManyInput[]
  }

  /**
   * productbatches update
   */
  export type productbatchesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * The data needed to update a productbatches.
     */
    data: XOR<productbatchesUpdateInput, productbatchesUncheckedUpdateInput>
    /**
     * Choose, which productbatches to update.
     */
    where: productbatchesWhereUniqueInput
  }

  /**
   * productbatches updateMany
   */
  export type productbatchesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update productbatches.
     */
    data: XOR<productbatchesUpdateManyMutationInput, productbatchesUncheckedUpdateManyInput>
    /**
     * Filter which productbatches to update
     */
    where?: productbatchesWhereInput
    /**
     * Limit how many productbatches to update.
     */
    limit?: number
  }

  /**
   * productbatches updateManyAndReturn
   */
  export type productbatchesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * The data used to update productbatches.
     */
    data: XOR<productbatchesUpdateManyMutationInput, productbatchesUncheckedUpdateManyInput>
    /**
     * Filter which productbatches to update
     */
    where?: productbatchesWhereInput
    /**
     * Limit how many productbatches to update.
     */
    limit?: number
  }

  /**
   * productbatches upsert
   */
  export type productbatchesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * The filter to search for the productbatches to update in case it exists.
     */
    where: productbatchesWhereUniqueInput
    /**
     * In case the productbatches found by the `where` argument doesn't exist, create a new productbatches with this data.
     */
    create: XOR<productbatchesCreateInput, productbatchesUncheckedCreateInput>
    /**
     * In case the productbatches was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productbatchesUpdateInput, productbatchesUncheckedUpdateInput>
  }

  /**
   * productbatches delete
   */
  export type productbatchesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
    /**
     * Filter which productbatches to delete.
     */
    where: productbatchesWhereUniqueInput
  }

  /**
   * productbatches deleteMany
   */
  export type productbatchesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productbatches to delete
     */
    where?: productbatchesWhereInput
    /**
     * Limit how many productbatches to delete.
     */
    limit?: number
  }

  /**
   * productbatches without action
   */
  export type productbatchesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productbatches
     */
    select?: productbatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productbatches
     */
    omit?: productbatchesOmit<ExtArgs> | null
  }


  /**
   * Model productsalepurchase
   */

  export type AggregateProductsalepurchase = {
    _count: ProductsalepurchaseCountAggregateOutputType | null
    _avg: ProductsalepurchaseAvgAggregateOutputType | null
    _sum: ProductsalepurchaseSumAggregateOutputType | null
    _min: ProductsalepurchaseMinAggregateOutputType | null
    _max: ProductsalepurchaseMaxAggregateOutputType | null
  }

  export type ProductsalepurchaseAvgAggregateOutputType = {
    price: number | null
    quantity: number | null
    total: number | null
  }

  export type ProductsalepurchaseSumAggregateOutputType = {
    price: number | null
    quantity: number | null
    total: number | null
  }

  export type ProductsalepurchaseMinAggregateOutputType = {
    id: string | null
    price: number | null
    quantity: number | null
    total: number | null
    fk_product_in_productsalepurchase: string | null
    fk_financetransaction_in_productsalepurchase: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductsalepurchaseMaxAggregateOutputType = {
    id: string | null
    price: number | null
    quantity: number | null
    total: number | null
    fk_product_in_productsalepurchase: string | null
    fk_financetransaction_in_productsalepurchase: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductsalepurchaseCountAggregateOutputType = {
    id: number
    price: number
    quantity: number
    total: number
    fk_product_in_productsalepurchase: number
    fk_financetransaction_in_productsalepurchase: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductsalepurchaseAvgAggregateInputType = {
    price?: true
    quantity?: true
    total?: true
  }

  export type ProductsalepurchaseSumAggregateInputType = {
    price?: true
    quantity?: true
    total?: true
  }

  export type ProductsalepurchaseMinAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    total?: true
    fk_product_in_productsalepurchase?: true
    fk_financetransaction_in_productsalepurchase?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductsalepurchaseMaxAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    total?: true
    fk_product_in_productsalepurchase?: true
    fk_financetransaction_in_productsalepurchase?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductsalepurchaseCountAggregateInputType = {
    id?: true
    price?: true
    quantity?: true
    total?: true
    fk_product_in_productsalepurchase?: true
    fk_financetransaction_in_productsalepurchase?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductsalepurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productsalepurchase to aggregate.
     */
    where?: productsalepurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsalepurchases to fetch.
     */
    orderBy?: productsalepurchaseOrderByWithRelationInput | productsalepurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productsalepurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsalepurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsalepurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned productsalepurchases
    **/
    _count?: true | ProductsalepurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductsalepurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductsalepurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductsalepurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductsalepurchaseMaxAggregateInputType
  }

  export type GetProductsalepurchaseAggregateType<T extends ProductsalepurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregateProductsalepurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductsalepurchase[P]>
      : GetScalarType<T[P], AggregateProductsalepurchase[P]>
  }




  export type productsalepurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productsalepurchaseWhereInput
    orderBy?: productsalepurchaseOrderByWithAggregationInput | productsalepurchaseOrderByWithAggregationInput[]
    by: ProductsalepurchaseScalarFieldEnum[] | ProductsalepurchaseScalarFieldEnum
    having?: productsalepurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductsalepurchaseCountAggregateInputType | true
    _avg?: ProductsalepurchaseAvgAggregateInputType
    _sum?: ProductsalepurchaseSumAggregateInputType
    _min?: ProductsalepurchaseMinAggregateInputType
    _max?: ProductsalepurchaseMaxAggregateInputType
  }

  export type ProductsalepurchaseGroupByOutputType = {
    id: string
    price: number | null
    quantity: number | null
    total: number | null
    fk_product_in_productsalepurchase: string | null
    fk_financetransaction_in_productsalepurchase: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductsalepurchaseCountAggregateOutputType | null
    _avg: ProductsalepurchaseAvgAggregateOutputType | null
    _sum: ProductsalepurchaseSumAggregateOutputType | null
    _min: ProductsalepurchaseMinAggregateOutputType | null
    _max: ProductsalepurchaseMaxAggregateOutputType | null
  }

  type GetProductsalepurchaseGroupByPayload<T extends productsalepurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductsalepurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductsalepurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductsalepurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], ProductsalepurchaseGroupByOutputType[P]>
        }
      >
    >


  export type productsalepurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    price?: boolean
    quantity?: boolean
    total?: boolean
    fk_product_in_productsalepurchase?: boolean
    fk_financetransaction_in_productsalepurchase?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productsalepurchase"]>

  export type productsalepurchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    price?: boolean
    quantity?: boolean
    total?: boolean
    fk_product_in_productsalepurchase?: boolean
    fk_financetransaction_in_productsalepurchase?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productsalepurchase"]>

  export type productsalepurchaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    price?: boolean
    quantity?: boolean
    total?: boolean
    fk_product_in_productsalepurchase?: boolean
    fk_financetransaction_in_productsalepurchase?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productsalepurchase"]>

  export type productsalepurchaseSelectScalar = {
    id?: boolean
    price?: boolean
    quantity?: boolean
    total?: boolean
    fk_product_in_productsalepurchase?: boolean
    fk_financetransaction_in_productsalepurchase?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type productsalepurchaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "price" | "quantity" | "total" | "fk_product_in_productsalepurchase" | "fk_financetransaction_in_productsalepurchase" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["productsalepurchase"]>

  export type $productsalepurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "productsalepurchase"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      price: number | null
      quantity: number | null
      total: number | null
      fk_product_in_productsalepurchase: string | null
      fk_financetransaction_in_productsalepurchase: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productsalepurchase"]>
    composites: {}
  }

  type productsalepurchaseGetPayload<S extends boolean | null | undefined | productsalepurchaseDefaultArgs> = $Result.GetResult<Prisma.$productsalepurchasePayload, S>

  type productsalepurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productsalepurchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductsalepurchaseCountAggregateInputType | true
    }

  export interface productsalepurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['productsalepurchase'], meta: { name: 'productsalepurchase' } }
    /**
     * Find zero or one Productsalepurchase that matches the filter.
     * @param {productsalepurchaseFindUniqueArgs} args - Arguments to find a Productsalepurchase
     * @example
     * // Get one Productsalepurchase
     * const productsalepurchase = await prisma.productsalepurchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productsalepurchaseFindUniqueArgs>(args: SelectSubset<T, productsalepurchaseFindUniqueArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Productsalepurchase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productsalepurchaseFindUniqueOrThrowArgs} args - Arguments to find a Productsalepurchase
     * @example
     * // Get one Productsalepurchase
     * const productsalepurchase = await prisma.productsalepurchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productsalepurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, productsalepurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productsalepurchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsalepurchaseFindFirstArgs} args - Arguments to find a Productsalepurchase
     * @example
     * // Get one Productsalepurchase
     * const productsalepurchase = await prisma.productsalepurchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productsalepurchaseFindFirstArgs>(args?: SelectSubset<T, productsalepurchaseFindFirstArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productsalepurchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsalepurchaseFindFirstOrThrowArgs} args - Arguments to find a Productsalepurchase
     * @example
     * // Get one Productsalepurchase
     * const productsalepurchase = await prisma.productsalepurchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productsalepurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, productsalepurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productsalepurchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsalepurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productsalepurchases
     * const productsalepurchases = await prisma.productsalepurchase.findMany()
     * 
     * // Get first 10 Productsalepurchases
     * const productsalepurchases = await prisma.productsalepurchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productsalepurchaseWithIdOnly = await prisma.productsalepurchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productsalepurchaseFindManyArgs>(args?: SelectSubset<T, productsalepurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Productsalepurchase.
     * @param {productsalepurchaseCreateArgs} args - Arguments to create a Productsalepurchase.
     * @example
     * // Create one Productsalepurchase
     * const Productsalepurchase = await prisma.productsalepurchase.create({
     *   data: {
     *     // ... data to create a Productsalepurchase
     *   }
     * })
     * 
     */
    create<T extends productsalepurchaseCreateArgs>(args: SelectSubset<T, productsalepurchaseCreateArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productsalepurchases.
     * @param {productsalepurchaseCreateManyArgs} args - Arguments to create many Productsalepurchases.
     * @example
     * // Create many Productsalepurchases
     * const productsalepurchase = await prisma.productsalepurchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productsalepurchaseCreateManyArgs>(args?: SelectSubset<T, productsalepurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productsalepurchases and returns the data saved in the database.
     * @param {productsalepurchaseCreateManyAndReturnArgs} args - Arguments to create many Productsalepurchases.
     * @example
     * // Create many Productsalepurchases
     * const productsalepurchase = await prisma.productsalepurchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productsalepurchases and only return the `id`
     * const productsalepurchaseWithIdOnly = await prisma.productsalepurchase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productsalepurchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, productsalepurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Productsalepurchase.
     * @param {productsalepurchaseDeleteArgs} args - Arguments to delete one Productsalepurchase.
     * @example
     * // Delete one Productsalepurchase
     * const Productsalepurchase = await prisma.productsalepurchase.delete({
     *   where: {
     *     // ... filter to delete one Productsalepurchase
     *   }
     * })
     * 
     */
    delete<T extends productsalepurchaseDeleteArgs>(args: SelectSubset<T, productsalepurchaseDeleteArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Productsalepurchase.
     * @param {productsalepurchaseUpdateArgs} args - Arguments to update one Productsalepurchase.
     * @example
     * // Update one Productsalepurchase
     * const productsalepurchase = await prisma.productsalepurchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productsalepurchaseUpdateArgs>(args: SelectSubset<T, productsalepurchaseUpdateArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productsalepurchases.
     * @param {productsalepurchaseDeleteManyArgs} args - Arguments to filter Productsalepurchases to delete.
     * @example
     * // Delete a few Productsalepurchases
     * const { count } = await prisma.productsalepurchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productsalepurchaseDeleteManyArgs>(args?: SelectSubset<T, productsalepurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productsalepurchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsalepurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productsalepurchases
     * const productsalepurchase = await prisma.productsalepurchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productsalepurchaseUpdateManyArgs>(args: SelectSubset<T, productsalepurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productsalepurchases and returns the data updated in the database.
     * @param {productsalepurchaseUpdateManyAndReturnArgs} args - Arguments to update many Productsalepurchases.
     * @example
     * // Update many Productsalepurchases
     * const productsalepurchase = await prisma.productsalepurchase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productsalepurchases and only return the `id`
     * const productsalepurchaseWithIdOnly = await prisma.productsalepurchase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productsalepurchaseUpdateManyAndReturnArgs>(args: SelectSubset<T, productsalepurchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Productsalepurchase.
     * @param {productsalepurchaseUpsertArgs} args - Arguments to update or create a Productsalepurchase.
     * @example
     * // Update or create a Productsalepurchase
     * const productsalepurchase = await prisma.productsalepurchase.upsert({
     *   create: {
     *     // ... data to create a Productsalepurchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Productsalepurchase we want to update
     *   }
     * })
     */
    upsert<T extends productsalepurchaseUpsertArgs>(args: SelectSubset<T, productsalepurchaseUpsertArgs<ExtArgs>>): Prisma__productsalepurchaseClient<$Result.GetResult<Prisma.$productsalepurchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productsalepurchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsalepurchaseCountArgs} args - Arguments to filter Productsalepurchases to count.
     * @example
     * // Count the number of Productsalepurchases
     * const count = await prisma.productsalepurchase.count({
     *   where: {
     *     // ... the filter for the Productsalepurchases we want to count
     *   }
     * })
    **/
    count<T extends productsalepurchaseCountArgs>(
      args?: Subset<T, productsalepurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductsalepurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Productsalepurchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsalepurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductsalepurchaseAggregateArgs>(args: Subset<T, ProductsalepurchaseAggregateArgs>): Prisma.PrismaPromise<GetProductsalepurchaseAggregateType<T>>

    /**
     * Group by Productsalepurchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsalepurchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productsalepurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productsalepurchaseGroupByArgs['orderBy'] }
        : { orderBy?: productsalepurchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productsalepurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductsalepurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the productsalepurchase model
   */
  readonly fields: productsalepurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for productsalepurchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productsalepurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the productsalepurchase model
   */
  interface productsalepurchaseFieldRefs {
    readonly id: FieldRef<"productsalepurchase", 'String'>
    readonly price: FieldRef<"productsalepurchase", 'Float'>
    readonly quantity: FieldRef<"productsalepurchase", 'Float'>
    readonly total: FieldRef<"productsalepurchase", 'Float'>
    readonly fk_product_in_productsalepurchase: FieldRef<"productsalepurchase", 'String'>
    readonly fk_financetransaction_in_productsalepurchase: FieldRef<"productsalepurchase", 'String'>
    readonly source: FieldRef<"productsalepurchase", 'String'>
    readonly createdAt: FieldRef<"productsalepurchase", 'DateTime'>
    readonly updatedAt: FieldRef<"productsalepurchase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * productsalepurchase findUnique
   */
  export type productsalepurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * Filter, which productsalepurchase to fetch.
     */
    where: productsalepurchaseWhereUniqueInput
  }

  /**
   * productsalepurchase findUniqueOrThrow
   */
  export type productsalepurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * Filter, which productsalepurchase to fetch.
     */
    where: productsalepurchaseWhereUniqueInput
  }

  /**
   * productsalepurchase findFirst
   */
  export type productsalepurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * Filter, which productsalepurchase to fetch.
     */
    where?: productsalepurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsalepurchases to fetch.
     */
    orderBy?: productsalepurchaseOrderByWithRelationInput | productsalepurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productsalepurchases.
     */
    cursor?: productsalepurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsalepurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsalepurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productsalepurchases.
     */
    distinct?: ProductsalepurchaseScalarFieldEnum | ProductsalepurchaseScalarFieldEnum[]
  }

  /**
   * productsalepurchase findFirstOrThrow
   */
  export type productsalepurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * Filter, which productsalepurchase to fetch.
     */
    where?: productsalepurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsalepurchases to fetch.
     */
    orderBy?: productsalepurchaseOrderByWithRelationInput | productsalepurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productsalepurchases.
     */
    cursor?: productsalepurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsalepurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsalepurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productsalepurchases.
     */
    distinct?: ProductsalepurchaseScalarFieldEnum | ProductsalepurchaseScalarFieldEnum[]
  }

  /**
   * productsalepurchase findMany
   */
  export type productsalepurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * Filter, which productsalepurchases to fetch.
     */
    where?: productsalepurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsalepurchases to fetch.
     */
    orderBy?: productsalepurchaseOrderByWithRelationInput | productsalepurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing productsalepurchases.
     */
    cursor?: productsalepurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsalepurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsalepurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productsalepurchases.
     */
    distinct?: ProductsalepurchaseScalarFieldEnum | ProductsalepurchaseScalarFieldEnum[]
  }

  /**
   * productsalepurchase create
   */
  export type productsalepurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * The data needed to create a productsalepurchase.
     */
    data: XOR<productsalepurchaseCreateInput, productsalepurchaseUncheckedCreateInput>
  }

  /**
   * productsalepurchase createMany
   */
  export type productsalepurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many productsalepurchases.
     */
    data: productsalepurchaseCreateManyInput | productsalepurchaseCreateManyInput[]
  }

  /**
   * productsalepurchase createManyAndReturn
   */
  export type productsalepurchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * The data used to create many productsalepurchases.
     */
    data: productsalepurchaseCreateManyInput | productsalepurchaseCreateManyInput[]
  }

  /**
   * productsalepurchase update
   */
  export type productsalepurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * The data needed to update a productsalepurchase.
     */
    data: XOR<productsalepurchaseUpdateInput, productsalepurchaseUncheckedUpdateInput>
    /**
     * Choose, which productsalepurchase to update.
     */
    where: productsalepurchaseWhereUniqueInput
  }

  /**
   * productsalepurchase updateMany
   */
  export type productsalepurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update productsalepurchases.
     */
    data: XOR<productsalepurchaseUpdateManyMutationInput, productsalepurchaseUncheckedUpdateManyInput>
    /**
     * Filter which productsalepurchases to update
     */
    where?: productsalepurchaseWhereInput
    /**
     * Limit how many productsalepurchases to update.
     */
    limit?: number
  }

  /**
   * productsalepurchase updateManyAndReturn
   */
  export type productsalepurchaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * The data used to update productsalepurchases.
     */
    data: XOR<productsalepurchaseUpdateManyMutationInput, productsalepurchaseUncheckedUpdateManyInput>
    /**
     * Filter which productsalepurchases to update
     */
    where?: productsalepurchaseWhereInput
    /**
     * Limit how many productsalepurchases to update.
     */
    limit?: number
  }

  /**
   * productsalepurchase upsert
   */
  export type productsalepurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * The filter to search for the productsalepurchase to update in case it exists.
     */
    where: productsalepurchaseWhereUniqueInput
    /**
     * In case the productsalepurchase found by the `where` argument doesn't exist, create a new productsalepurchase with this data.
     */
    create: XOR<productsalepurchaseCreateInput, productsalepurchaseUncheckedCreateInput>
    /**
     * In case the productsalepurchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productsalepurchaseUpdateInput, productsalepurchaseUncheckedUpdateInput>
  }

  /**
   * productsalepurchase delete
   */
  export type productsalepurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
    /**
     * Filter which productsalepurchase to delete.
     */
    where: productsalepurchaseWhereUniqueInput
  }

  /**
   * productsalepurchase deleteMany
   */
  export type productsalepurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productsalepurchases to delete
     */
    where?: productsalepurchaseWhereInput
    /**
     * Limit how many productsalepurchases to delete.
     */
    limit?: number
  }

  /**
   * productsalepurchase without action
   */
  export type productsalepurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsalepurchase
     */
    select?: productsalepurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsalepurchase
     */
    omit?: productsalepurchaseOmit<ExtArgs> | null
  }


  /**
   * Model productsub
   */

  export type AggregateProductsub = {
    _count: ProductsubCountAggregateOutputType | null
    _avg: ProductsubAvgAggregateOutputType | null
    _sum: ProductsubSumAggregateOutputType | null
    _min: ProductsubMinAggregateOutputType | null
    _max: ProductsubMaxAggregateOutputType | null
  }

  export type ProductsubAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ProductsubSumAggregateOutputType = {
    quantity: number | null
  }

  export type ProductsubMinAggregateOutputType = {
    id: string | null
    fk_product_main_in_productsub: string | null
    fk_product_sub_in_productsub: string | null
    quantity: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductsubMaxAggregateOutputType = {
    id: string | null
    fk_product_main_in_productsub: string | null
    fk_product_sub_in_productsub: string | null
    quantity: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductsubCountAggregateOutputType = {
    id: number
    fk_product_main_in_productsub: number
    fk_product_sub_in_productsub: number
    quantity: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductsubAvgAggregateInputType = {
    quantity?: true
  }

  export type ProductsubSumAggregateInputType = {
    quantity?: true
  }

  export type ProductsubMinAggregateInputType = {
    id?: true
    fk_product_main_in_productsub?: true
    fk_product_sub_in_productsub?: true
    quantity?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductsubMaxAggregateInputType = {
    id?: true
    fk_product_main_in_productsub?: true
    fk_product_sub_in_productsub?: true
    quantity?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductsubCountAggregateInputType = {
    id?: true
    fk_product_main_in_productsub?: true
    fk_product_sub_in_productsub?: true
    quantity?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductsubAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productsub to aggregate.
     */
    where?: productsubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsubs to fetch.
     */
    orderBy?: productsubOrderByWithRelationInput | productsubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productsubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned productsubs
    **/
    _count?: true | ProductsubCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductsubAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductsubSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductsubMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductsubMaxAggregateInputType
  }

  export type GetProductsubAggregateType<T extends ProductsubAggregateArgs> = {
        [P in keyof T & keyof AggregateProductsub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductsub[P]>
      : GetScalarType<T[P], AggregateProductsub[P]>
  }




  export type productsubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productsubWhereInput
    orderBy?: productsubOrderByWithAggregationInput | productsubOrderByWithAggregationInput[]
    by: ProductsubScalarFieldEnum[] | ProductsubScalarFieldEnum
    having?: productsubScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductsubCountAggregateInputType | true
    _avg?: ProductsubAvgAggregateInputType
    _sum?: ProductsubSumAggregateInputType
    _min?: ProductsubMinAggregateInputType
    _max?: ProductsubMaxAggregateInputType
  }

  export type ProductsubGroupByOutputType = {
    id: string
    fk_product_main_in_productsub: string | null
    fk_product_sub_in_productsub: string | null
    quantity: number | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductsubCountAggregateOutputType | null
    _avg: ProductsubAvgAggregateOutputType | null
    _sum: ProductsubSumAggregateOutputType | null
    _min: ProductsubMinAggregateOutputType | null
    _max: ProductsubMaxAggregateOutputType | null
  }

  type GetProductsubGroupByPayload<T extends productsubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductsubGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductsubGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductsubGroupByOutputType[P]>
            : GetScalarType<T[P], ProductsubGroupByOutputType[P]>
        }
      >
    >


  export type productsubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fk_product_main_in_productsub?: boolean
    fk_product_sub_in_productsub?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productsub"]>

  export type productsubSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fk_product_main_in_productsub?: boolean
    fk_product_sub_in_productsub?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productsub"]>

  export type productsubSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fk_product_main_in_productsub?: boolean
    fk_product_sub_in_productsub?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productsub"]>

  export type productsubSelectScalar = {
    id?: boolean
    fk_product_main_in_productsub?: boolean
    fk_product_sub_in_productsub?: boolean
    quantity?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type productsubOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fk_product_main_in_productsub" | "fk_product_sub_in_productsub" | "quantity" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["productsub"]>

  export type $productsubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "productsub"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fk_product_main_in_productsub: string | null
      fk_product_sub_in_productsub: string | null
      quantity: number | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productsub"]>
    composites: {}
  }

  type productsubGetPayload<S extends boolean | null | undefined | productsubDefaultArgs> = $Result.GetResult<Prisma.$productsubPayload, S>

  type productsubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productsubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductsubCountAggregateInputType | true
    }

  export interface productsubDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['productsub'], meta: { name: 'productsub' } }
    /**
     * Find zero or one Productsub that matches the filter.
     * @param {productsubFindUniqueArgs} args - Arguments to find a Productsub
     * @example
     * // Get one Productsub
     * const productsub = await prisma.productsub.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productsubFindUniqueArgs>(args: SelectSubset<T, productsubFindUniqueArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Productsub that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productsubFindUniqueOrThrowArgs} args - Arguments to find a Productsub
     * @example
     * // Get one Productsub
     * const productsub = await prisma.productsub.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productsubFindUniqueOrThrowArgs>(args: SelectSubset<T, productsubFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productsub that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsubFindFirstArgs} args - Arguments to find a Productsub
     * @example
     * // Get one Productsub
     * const productsub = await prisma.productsub.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productsubFindFirstArgs>(args?: SelectSubset<T, productsubFindFirstArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productsub that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsubFindFirstOrThrowArgs} args - Arguments to find a Productsub
     * @example
     * // Get one Productsub
     * const productsub = await prisma.productsub.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productsubFindFirstOrThrowArgs>(args?: SelectSubset<T, productsubFindFirstOrThrowArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productsubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productsubs
     * const productsubs = await prisma.productsub.findMany()
     * 
     * // Get first 10 Productsubs
     * const productsubs = await prisma.productsub.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productsubWithIdOnly = await prisma.productsub.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productsubFindManyArgs>(args?: SelectSubset<T, productsubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Productsub.
     * @param {productsubCreateArgs} args - Arguments to create a Productsub.
     * @example
     * // Create one Productsub
     * const Productsub = await prisma.productsub.create({
     *   data: {
     *     // ... data to create a Productsub
     *   }
     * })
     * 
     */
    create<T extends productsubCreateArgs>(args: SelectSubset<T, productsubCreateArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productsubs.
     * @param {productsubCreateManyArgs} args - Arguments to create many Productsubs.
     * @example
     * // Create many Productsubs
     * const productsub = await prisma.productsub.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productsubCreateManyArgs>(args?: SelectSubset<T, productsubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productsubs and returns the data saved in the database.
     * @param {productsubCreateManyAndReturnArgs} args - Arguments to create many Productsubs.
     * @example
     * // Create many Productsubs
     * const productsub = await prisma.productsub.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productsubs and only return the `id`
     * const productsubWithIdOnly = await prisma.productsub.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productsubCreateManyAndReturnArgs>(args?: SelectSubset<T, productsubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Productsub.
     * @param {productsubDeleteArgs} args - Arguments to delete one Productsub.
     * @example
     * // Delete one Productsub
     * const Productsub = await prisma.productsub.delete({
     *   where: {
     *     // ... filter to delete one Productsub
     *   }
     * })
     * 
     */
    delete<T extends productsubDeleteArgs>(args: SelectSubset<T, productsubDeleteArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Productsub.
     * @param {productsubUpdateArgs} args - Arguments to update one Productsub.
     * @example
     * // Update one Productsub
     * const productsub = await prisma.productsub.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productsubUpdateArgs>(args: SelectSubset<T, productsubUpdateArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productsubs.
     * @param {productsubDeleteManyArgs} args - Arguments to filter Productsubs to delete.
     * @example
     * // Delete a few Productsubs
     * const { count } = await prisma.productsub.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productsubDeleteManyArgs>(args?: SelectSubset<T, productsubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productsubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productsubs
     * const productsub = await prisma.productsub.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productsubUpdateManyArgs>(args: SelectSubset<T, productsubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productsubs and returns the data updated in the database.
     * @param {productsubUpdateManyAndReturnArgs} args - Arguments to update many Productsubs.
     * @example
     * // Update many Productsubs
     * const productsub = await prisma.productsub.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productsubs and only return the `id`
     * const productsubWithIdOnly = await prisma.productsub.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productsubUpdateManyAndReturnArgs>(args: SelectSubset<T, productsubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Productsub.
     * @param {productsubUpsertArgs} args - Arguments to update or create a Productsub.
     * @example
     * // Update or create a Productsub
     * const productsub = await prisma.productsub.upsert({
     *   create: {
     *     // ... data to create a Productsub
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Productsub we want to update
     *   }
     * })
     */
    upsert<T extends productsubUpsertArgs>(args: SelectSubset<T, productsubUpsertArgs<ExtArgs>>): Prisma__productsubClient<$Result.GetResult<Prisma.$productsubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productsubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsubCountArgs} args - Arguments to filter Productsubs to count.
     * @example
     * // Count the number of Productsubs
     * const count = await prisma.productsub.count({
     *   where: {
     *     // ... the filter for the Productsubs we want to count
     *   }
     * })
    **/
    count<T extends productsubCountArgs>(
      args?: Subset<T, productsubCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductsubCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Productsub.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductsubAggregateArgs>(args: Subset<T, ProductsubAggregateArgs>): Prisma.PrismaPromise<GetProductsubAggregateType<T>>

    /**
     * Group by Productsub.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsubGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productsubGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productsubGroupByArgs['orderBy'] }
        : { orderBy?: productsubGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productsubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductsubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the productsub model
   */
  readonly fields: productsubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for productsub.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productsubClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the productsub model
   */
  interface productsubFieldRefs {
    readonly id: FieldRef<"productsub", 'String'>
    readonly fk_product_main_in_productsub: FieldRef<"productsub", 'String'>
    readonly fk_product_sub_in_productsub: FieldRef<"productsub", 'String'>
    readonly quantity: FieldRef<"productsub", 'Float'>
    readonly source: FieldRef<"productsub", 'String'>
    readonly createdAt: FieldRef<"productsub", 'DateTime'>
    readonly updatedAt: FieldRef<"productsub", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * productsub findUnique
   */
  export type productsubFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * Filter, which productsub to fetch.
     */
    where: productsubWhereUniqueInput
  }

  /**
   * productsub findUniqueOrThrow
   */
  export type productsubFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * Filter, which productsub to fetch.
     */
    where: productsubWhereUniqueInput
  }

  /**
   * productsub findFirst
   */
  export type productsubFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * Filter, which productsub to fetch.
     */
    where?: productsubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsubs to fetch.
     */
    orderBy?: productsubOrderByWithRelationInput | productsubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productsubs.
     */
    cursor?: productsubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productsubs.
     */
    distinct?: ProductsubScalarFieldEnum | ProductsubScalarFieldEnum[]
  }

  /**
   * productsub findFirstOrThrow
   */
  export type productsubFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * Filter, which productsub to fetch.
     */
    where?: productsubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsubs to fetch.
     */
    orderBy?: productsubOrderByWithRelationInput | productsubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productsubs.
     */
    cursor?: productsubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productsubs.
     */
    distinct?: ProductsubScalarFieldEnum | ProductsubScalarFieldEnum[]
  }

  /**
   * productsub findMany
   */
  export type productsubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * Filter, which productsubs to fetch.
     */
    where?: productsubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productsubs to fetch.
     */
    orderBy?: productsubOrderByWithRelationInput | productsubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing productsubs.
     */
    cursor?: productsubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productsubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productsubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productsubs.
     */
    distinct?: ProductsubScalarFieldEnum | ProductsubScalarFieldEnum[]
  }

  /**
   * productsub create
   */
  export type productsubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * The data needed to create a productsub.
     */
    data: XOR<productsubCreateInput, productsubUncheckedCreateInput>
  }

  /**
   * productsub createMany
   */
  export type productsubCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many productsubs.
     */
    data: productsubCreateManyInput | productsubCreateManyInput[]
  }

  /**
   * productsub createManyAndReturn
   */
  export type productsubCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * The data used to create many productsubs.
     */
    data: productsubCreateManyInput | productsubCreateManyInput[]
  }

  /**
   * productsub update
   */
  export type productsubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * The data needed to update a productsub.
     */
    data: XOR<productsubUpdateInput, productsubUncheckedUpdateInput>
    /**
     * Choose, which productsub to update.
     */
    where: productsubWhereUniqueInput
  }

  /**
   * productsub updateMany
   */
  export type productsubUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update productsubs.
     */
    data: XOR<productsubUpdateManyMutationInput, productsubUncheckedUpdateManyInput>
    /**
     * Filter which productsubs to update
     */
    where?: productsubWhereInput
    /**
     * Limit how many productsubs to update.
     */
    limit?: number
  }

  /**
   * productsub updateManyAndReturn
   */
  export type productsubUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * The data used to update productsubs.
     */
    data: XOR<productsubUpdateManyMutationInput, productsubUncheckedUpdateManyInput>
    /**
     * Filter which productsubs to update
     */
    where?: productsubWhereInput
    /**
     * Limit how many productsubs to update.
     */
    limit?: number
  }

  /**
   * productsub upsert
   */
  export type productsubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * The filter to search for the productsub to update in case it exists.
     */
    where: productsubWhereUniqueInput
    /**
     * In case the productsub found by the `where` argument doesn't exist, create a new productsub with this data.
     */
    create: XOR<productsubCreateInput, productsubUncheckedCreateInput>
    /**
     * In case the productsub was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productsubUpdateInput, productsubUncheckedUpdateInput>
  }

  /**
   * productsub delete
   */
  export type productsubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
    /**
     * Filter which productsub to delete.
     */
    where: productsubWhereUniqueInput
  }

  /**
   * productsub deleteMany
   */
  export type productsubDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productsubs to delete
     */
    where?: productsubWhereInput
    /**
     * Limit how many productsubs to delete.
     */
    limit?: number
  }

  /**
   * productsub without action
   */
  export type productsubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productsub
     */
    select?: productsubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productsub
     */
    omit?: productsubOmit<ExtArgs> | null
  }


  /**
   * Model purchase
   */

  export type AggregatePurchase = {
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  export type PurchaseAvgAggregateOutputType = {
    totalAmount: number | null
    totalPayment: number | null
  }

  export type PurchaseSumAggregateOutputType = {
    totalAmount: number | null
    totalPayment: number | null
  }

  export type PurchaseMinAggregateOutputType = {
    id: string | null
    createdby: string | null
    updatedby: string | null
    vendor: string | null
    totalAmount: number | null
    totalPayment: number | null
    invoicenum: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseMaxAggregateOutputType = {
    id: string | null
    createdby: string | null
    updatedby: string | null
    vendor: string | null
    totalAmount: number | null
    totalPayment: number | null
    invoicenum: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseCountAggregateOutputType = {
    id: number
    createdby: number
    updatedby: number
    vendor: number
    totalAmount: number
    totalPayment: number
    invoicenum: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PurchaseAvgAggregateInputType = {
    totalAmount?: true
    totalPayment?: true
  }

  export type PurchaseSumAggregateInputType = {
    totalAmount?: true
    totalPayment?: true
  }

  export type PurchaseMinAggregateInputType = {
    id?: true
    createdby?: true
    updatedby?: true
    vendor?: true
    totalAmount?: true
    totalPayment?: true
    invoicenum?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseMaxAggregateInputType = {
    id?: true
    createdby?: true
    updatedby?: true
    vendor?: true
    totalAmount?: true
    totalPayment?: true
    invoicenum?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseCountAggregateInputType = {
    id?: true
    createdby?: true
    updatedby?: true
    vendor?: true
    totalAmount?: true
    totalPayment?: true
    invoicenum?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which purchase to aggregate.
     */
    where?: purchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchaseOrderByWithRelationInput | purchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: purchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned purchases
    **/
    _count?: true | PurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseMaxAggregateInputType
  }

  export type GetPurchaseAggregateType<T extends PurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchase[P]>
      : GetScalarType<T[P], AggregatePurchase[P]>
  }




  export type purchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchaseWhereInput
    orderBy?: purchaseOrderByWithAggregationInput | purchaseOrderByWithAggregationInput[]
    by: PurchaseScalarFieldEnum[] | PurchaseScalarFieldEnum
    having?: purchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseCountAggregateInputType | true
    _avg?: PurchaseAvgAggregateInputType
    _sum?: PurchaseSumAggregateInputType
    _min?: PurchaseMinAggregateInputType
    _max?: PurchaseMaxAggregateInputType
  }

  export type PurchaseGroupByOutputType = {
    id: string
    createdby: string | null
    updatedby: string | null
    vendor: string | null
    totalAmount: number | null
    totalPayment: number | null
    invoicenum: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  type GetPurchaseGroupByPayload<T extends purchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
        }
      >
    >


  export type purchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdby?: boolean
    updatedby?: boolean
    vendor?: boolean
    totalAmount?: boolean
    totalPayment?: boolean
    invoicenum?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["purchase"]>

  export type purchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdby?: boolean
    updatedby?: boolean
    vendor?: boolean
    totalAmount?: boolean
    totalPayment?: boolean
    invoicenum?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["purchase"]>

  export type purchaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdby?: boolean
    updatedby?: boolean
    vendor?: boolean
    totalAmount?: boolean
    totalPayment?: boolean
    invoicenum?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["purchase"]>

  export type purchaseSelectScalar = {
    id?: boolean
    createdby?: boolean
    updatedby?: boolean
    vendor?: boolean
    totalAmount?: boolean
    totalPayment?: boolean
    invoicenum?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type purchaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdby" | "updatedby" | "vendor" | "totalAmount" | "totalPayment" | "invoicenum" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["purchase"]>

  export type $purchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "purchase"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdby: string | null
      updatedby: string | null
      vendor: string | null
      totalAmount: number | null
      totalPayment: number | null
      invoicenum: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["purchase"]>
    composites: {}
  }

  type purchaseGetPayload<S extends boolean | null | undefined | purchaseDefaultArgs> = $Result.GetResult<Prisma.$purchasePayload, S>

  type purchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<purchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PurchaseCountAggregateInputType | true
    }

  export interface purchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['purchase'], meta: { name: 'purchase' } }
    /**
     * Find zero or one Purchase that matches the filter.
     * @param {purchaseFindUniqueArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends purchaseFindUniqueArgs>(args: SelectSubset<T, purchaseFindUniqueArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Purchase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {purchaseFindUniqueOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends purchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, purchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchaseFindFirstArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends purchaseFindFirstArgs>(args?: SelectSubset<T, purchaseFindFirstArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchaseFindFirstOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends purchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, purchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchase.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseWithIdOnly = await prisma.purchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends purchaseFindManyArgs>(args?: SelectSubset<T, purchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Purchase.
     * @param {purchaseCreateArgs} args - Arguments to create a Purchase.
     * @example
     * // Create one Purchase
     * const Purchase = await prisma.purchase.create({
     *   data: {
     *     // ... data to create a Purchase
     *   }
     * })
     * 
     */
    create<T extends purchaseCreateArgs>(args: SelectSubset<T, purchaseCreateArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Purchases.
     * @param {purchaseCreateManyArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends purchaseCreateManyArgs>(args?: SelectSubset<T, purchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purchases and returns the data saved in the database.
     * @param {purchaseCreateManyAndReturnArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends purchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, purchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Purchase.
     * @param {purchaseDeleteArgs} args - Arguments to delete one Purchase.
     * @example
     * // Delete one Purchase
     * const Purchase = await prisma.purchase.delete({
     *   where: {
     *     // ... filter to delete one Purchase
     *   }
     * })
     * 
     */
    delete<T extends purchaseDeleteArgs>(args: SelectSubset<T, purchaseDeleteArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Purchase.
     * @param {purchaseUpdateArgs} args - Arguments to update one Purchase.
     * @example
     * // Update one Purchase
     * const purchase = await prisma.purchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends purchaseUpdateArgs>(args: SelectSubset<T, purchaseUpdateArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Purchases.
     * @param {purchaseDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends purchaseDeleteManyArgs>(args?: SelectSubset<T, purchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends purchaseUpdateManyArgs>(args: SelectSubset<T, purchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases and returns the data updated in the database.
     * @param {purchaseUpdateManyAndReturnArgs} args - Arguments to update many Purchases.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends purchaseUpdateManyAndReturnArgs>(args: SelectSubset<T, purchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Purchase.
     * @param {purchaseUpsertArgs} args - Arguments to update or create a Purchase.
     * @example
     * // Update or create a Purchase
     * const purchase = await prisma.purchase.upsert({
     *   create: {
     *     // ... data to create a Purchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchase we want to update
     *   }
     * })
     */
    upsert<T extends purchaseUpsertArgs>(args: SelectSubset<T, purchaseUpsertArgs<ExtArgs>>): Prisma__purchaseClient<$Result.GetResult<Prisma.$purchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchaseCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchase.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends purchaseCountArgs>(
      args?: Subset<T, purchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseAggregateArgs>(args: Subset<T, PurchaseAggregateArgs>): Prisma.PrismaPromise<GetPurchaseAggregateType<T>>

    /**
     * Group by Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends purchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: purchaseGroupByArgs['orderBy'] }
        : { orderBy?: purchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, purchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the purchase model
   */
  readonly fields: purchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for purchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__purchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the purchase model
   */
  interface purchaseFieldRefs {
    readonly id: FieldRef<"purchase", 'String'>
    readonly createdby: FieldRef<"purchase", 'String'>
    readonly updatedby: FieldRef<"purchase", 'String'>
    readonly vendor: FieldRef<"purchase", 'String'>
    readonly totalAmount: FieldRef<"purchase", 'Float'>
    readonly totalPayment: FieldRef<"purchase", 'Float'>
    readonly invoicenum: FieldRef<"purchase", 'String'>
    readonly source: FieldRef<"purchase", 'String'>
    readonly createdAt: FieldRef<"purchase", 'DateTime'>
    readonly updatedAt: FieldRef<"purchase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * purchase findUnique
   */
  export type purchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * Filter, which purchase to fetch.
     */
    where: purchaseWhereUniqueInput
  }

  /**
   * purchase findUniqueOrThrow
   */
  export type purchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * Filter, which purchase to fetch.
     */
    where: purchaseWhereUniqueInput
  }

  /**
   * purchase findFirst
   */
  export type purchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * Filter, which purchase to fetch.
     */
    where?: purchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchaseOrderByWithRelationInput | purchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for purchases.
     */
    cursor?: purchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * purchase findFirstOrThrow
   */
  export type purchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * Filter, which purchase to fetch.
     */
    where?: purchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchaseOrderByWithRelationInput | purchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for purchases.
     */
    cursor?: purchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * purchase findMany
   */
  export type purchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * Filter, which purchases to fetch.
     */
    where?: purchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchaseOrderByWithRelationInput | purchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing purchases.
     */
    cursor?: purchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * purchase create
   */
  export type purchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * The data needed to create a purchase.
     */
    data: XOR<purchaseCreateInput, purchaseUncheckedCreateInput>
  }

  /**
   * purchase createMany
   */
  export type purchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many purchases.
     */
    data: purchaseCreateManyInput | purchaseCreateManyInput[]
  }

  /**
   * purchase createManyAndReturn
   */
  export type purchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * The data used to create many purchases.
     */
    data: purchaseCreateManyInput | purchaseCreateManyInput[]
  }

  /**
   * purchase update
   */
  export type purchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * The data needed to update a purchase.
     */
    data: XOR<purchaseUpdateInput, purchaseUncheckedUpdateInput>
    /**
     * Choose, which purchase to update.
     */
    where: purchaseWhereUniqueInput
  }

  /**
   * purchase updateMany
   */
  export type purchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update purchases.
     */
    data: XOR<purchaseUpdateManyMutationInput, purchaseUncheckedUpdateManyInput>
    /**
     * Filter which purchases to update
     */
    where?: purchaseWhereInput
    /**
     * Limit how many purchases to update.
     */
    limit?: number
  }

  /**
   * purchase updateManyAndReturn
   */
  export type purchaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * The data used to update purchases.
     */
    data: XOR<purchaseUpdateManyMutationInput, purchaseUncheckedUpdateManyInput>
    /**
     * Filter which purchases to update
     */
    where?: purchaseWhereInput
    /**
     * Limit how many purchases to update.
     */
    limit?: number
  }

  /**
   * purchase upsert
   */
  export type purchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * The filter to search for the purchase to update in case it exists.
     */
    where: purchaseWhereUniqueInput
    /**
     * In case the purchase found by the `where` argument doesn't exist, create a new purchase with this data.
     */
    create: XOR<purchaseCreateInput, purchaseUncheckedCreateInput>
    /**
     * In case the purchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<purchaseUpdateInput, purchaseUncheckedUpdateInput>
  }

  /**
   * purchase delete
   */
  export type purchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
    /**
     * Filter which purchase to delete.
     */
    where: purchaseWhereUniqueInput
  }

  /**
   * purchase deleteMany
   */
  export type purchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which purchases to delete
     */
    where?: purchaseWhereInput
    /**
     * Limit how many purchases to delete.
     */
    limit?: number
  }

  /**
   * purchase without action
   */
  export type purchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchase
     */
    select?: purchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchase
     */
    omit?: purchaseOmit<ExtArgs> | null
  }


  /**
   * Model purchasedproducts
   */

  export type AggregatePurchasedproducts = {
    _count: PurchasedproductsCountAggregateOutputType | null
    _avg: PurchasedproductsAvgAggregateOutputType | null
    _sum: PurchasedproductsSumAggregateOutputType | null
    _min: PurchasedproductsMinAggregateOutputType | null
    _max: PurchasedproductsMaxAggregateOutputType | null
  }

  export type PurchasedproductsAvgAggregateOutputType = {
    quantity: number | null
    totalAmount: number | null
  }

  export type PurchasedproductsSumAggregateOutputType = {
    quantity: number | null
    totalAmount: number | null
  }

  export type PurchasedproductsMinAggregateOutputType = {
    id: string | null
    purchase: string | null
    product: string | null
    quantity: number | null
    totalAmount: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchasedproductsMaxAggregateOutputType = {
    id: string | null
    purchase: string | null
    product: string | null
    quantity: number | null
    totalAmount: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchasedproductsCountAggregateOutputType = {
    id: number
    purchase: number
    product: number
    quantity: number
    totalAmount: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PurchasedproductsAvgAggregateInputType = {
    quantity?: true
    totalAmount?: true
  }

  export type PurchasedproductsSumAggregateInputType = {
    quantity?: true
    totalAmount?: true
  }

  export type PurchasedproductsMinAggregateInputType = {
    id?: true
    purchase?: true
    product?: true
    quantity?: true
    totalAmount?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchasedproductsMaxAggregateInputType = {
    id?: true
    purchase?: true
    product?: true
    quantity?: true
    totalAmount?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchasedproductsCountAggregateInputType = {
    id?: true
    purchase?: true
    product?: true
    quantity?: true
    totalAmount?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PurchasedproductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which purchasedproducts to aggregate.
     */
    where?: purchasedproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchasedproducts to fetch.
     */
    orderBy?: purchasedproductsOrderByWithRelationInput | purchasedproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: purchasedproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchasedproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchasedproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned purchasedproducts
    **/
    _count?: true | PurchasedproductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchasedproductsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchasedproductsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchasedproductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchasedproductsMaxAggregateInputType
  }

  export type GetPurchasedproductsAggregateType<T extends PurchasedproductsAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchasedproducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchasedproducts[P]>
      : GetScalarType<T[P], AggregatePurchasedproducts[P]>
  }




  export type purchasedproductsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchasedproductsWhereInput
    orderBy?: purchasedproductsOrderByWithAggregationInput | purchasedproductsOrderByWithAggregationInput[]
    by: PurchasedproductsScalarFieldEnum[] | PurchasedproductsScalarFieldEnum
    having?: purchasedproductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchasedproductsCountAggregateInputType | true
    _avg?: PurchasedproductsAvgAggregateInputType
    _sum?: PurchasedproductsSumAggregateInputType
    _min?: PurchasedproductsMinAggregateInputType
    _max?: PurchasedproductsMaxAggregateInputType
  }

  export type PurchasedproductsGroupByOutputType = {
    id: string
    purchase: string | null
    product: string | null
    quantity: number | null
    totalAmount: number | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: PurchasedproductsCountAggregateOutputType | null
    _avg: PurchasedproductsAvgAggregateOutputType | null
    _sum: PurchasedproductsSumAggregateOutputType | null
    _min: PurchasedproductsMinAggregateOutputType | null
    _max: PurchasedproductsMaxAggregateOutputType | null
  }

  type GetPurchasedproductsGroupByPayload<T extends purchasedproductsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchasedproductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchasedproductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchasedproductsGroupByOutputType[P]>
            : GetScalarType<T[P], PurchasedproductsGroupByOutputType[P]>
        }
      >
    >


  export type purchasedproductsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchase?: boolean
    product?: boolean
    quantity?: boolean
    totalAmount?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["purchasedproducts"]>

  export type purchasedproductsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchase?: boolean
    product?: boolean
    quantity?: boolean
    totalAmount?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["purchasedproducts"]>

  export type purchasedproductsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchase?: boolean
    product?: boolean
    quantity?: boolean
    totalAmount?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["purchasedproducts"]>

  export type purchasedproductsSelectScalar = {
    id?: boolean
    purchase?: boolean
    product?: boolean
    quantity?: boolean
    totalAmount?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type purchasedproductsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "purchase" | "product" | "quantity" | "totalAmount" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["purchasedproducts"]>

  export type $purchasedproductsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "purchasedproducts"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      purchase: string | null
      product: string | null
      quantity: number | null
      totalAmount: number | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["purchasedproducts"]>
    composites: {}
  }

  type purchasedproductsGetPayload<S extends boolean | null | undefined | purchasedproductsDefaultArgs> = $Result.GetResult<Prisma.$purchasedproductsPayload, S>

  type purchasedproductsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<purchasedproductsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PurchasedproductsCountAggregateInputType | true
    }

  export interface purchasedproductsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['purchasedproducts'], meta: { name: 'purchasedproducts' } }
    /**
     * Find zero or one Purchasedproducts that matches the filter.
     * @param {purchasedproductsFindUniqueArgs} args - Arguments to find a Purchasedproducts
     * @example
     * // Get one Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends purchasedproductsFindUniqueArgs>(args: SelectSubset<T, purchasedproductsFindUniqueArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Purchasedproducts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {purchasedproductsFindUniqueOrThrowArgs} args - Arguments to find a Purchasedproducts
     * @example
     * // Get one Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends purchasedproductsFindUniqueOrThrowArgs>(args: SelectSubset<T, purchasedproductsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchasedproducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasedproductsFindFirstArgs} args - Arguments to find a Purchasedproducts
     * @example
     * // Get one Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends purchasedproductsFindFirstArgs>(args?: SelectSubset<T, purchasedproductsFindFirstArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchasedproducts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasedproductsFindFirstOrThrowArgs} args - Arguments to find a Purchasedproducts
     * @example
     * // Get one Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends purchasedproductsFindFirstOrThrowArgs>(args?: SelectSubset<T, purchasedproductsFindFirstOrThrowArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Purchasedproducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasedproductsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.findMany()
     * 
     * // Get first 10 Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchasedproductsWithIdOnly = await prisma.purchasedproducts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends purchasedproductsFindManyArgs>(args?: SelectSubset<T, purchasedproductsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Purchasedproducts.
     * @param {purchasedproductsCreateArgs} args - Arguments to create a Purchasedproducts.
     * @example
     * // Create one Purchasedproducts
     * const Purchasedproducts = await prisma.purchasedproducts.create({
     *   data: {
     *     // ... data to create a Purchasedproducts
     *   }
     * })
     * 
     */
    create<T extends purchasedproductsCreateArgs>(args: SelectSubset<T, purchasedproductsCreateArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Purchasedproducts.
     * @param {purchasedproductsCreateManyArgs} args - Arguments to create many Purchasedproducts.
     * @example
     * // Create many Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends purchasedproductsCreateManyArgs>(args?: SelectSubset<T, purchasedproductsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purchasedproducts and returns the data saved in the database.
     * @param {purchasedproductsCreateManyAndReturnArgs} args - Arguments to create many Purchasedproducts.
     * @example
     * // Create many Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purchasedproducts and only return the `id`
     * const purchasedproductsWithIdOnly = await prisma.purchasedproducts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends purchasedproductsCreateManyAndReturnArgs>(args?: SelectSubset<T, purchasedproductsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Purchasedproducts.
     * @param {purchasedproductsDeleteArgs} args - Arguments to delete one Purchasedproducts.
     * @example
     * // Delete one Purchasedproducts
     * const Purchasedproducts = await prisma.purchasedproducts.delete({
     *   where: {
     *     // ... filter to delete one Purchasedproducts
     *   }
     * })
     * 
     */
    delete<T extends purchasedproductsDeleteArgs>(args: SelectSubset<T, purchasedproductsDeleteArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Purchasedproducts.
     * @param {purchasedproductsUpdateArgs} args - Arguments to update one Purchasedproducts.
     * @example
     * // Update one Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends purchasedproductsUpdateArgs>(args: SelectSubset<T, purchasedproductsUpdateArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Purchasedproducts.
     * @param {purchasedproductsDeleteManyArgs} args - Arguments to filter Purchasedproducts to delete.
     * @example
     * // Delete a few Purchasedproducts
     * const { count } = await prisma.purchasedproducts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends purchasedproductsDeleteManyArgs>(args?: SelectSubset<T, purchasedproductsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchasedproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasedproductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends purchasedproductsUpdateManyArgs>(args: SelectSubset<T, purchasedproductsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchasedproducts and returns the data updated in the database.
     * @param {purchasedproductsUpdateManyAndReturnArgs} args - Arguments to update many Purchasedproducts.
     * @example
     * // Update many Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Purchasedproducts and only return the `id`
     * const purchasedproductsWithIdOnly = await prisma.purchasedproducts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends purchasedproductsUpdateManyAndReturnArgs>(args: SelectSubset<T, purchasedproductsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Purchasedproducts.
     * @param {purchasedproductsUpsertArgs} args - Arguments to update or create a Purchasedproducts.
     * @example
     * // Update or create a Purchasedproducts
     * const purchasedproducts = await prisma.purchasedproducts.upsert({
     *   create: {
     *     // ... data to create a Purchasedproducts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchasedproducts we want to update
     *   }
     * })
     */
    upsert<T extends purchasedproductsUpsertArgs>(args: SelectSubset<T, purchasedproductsUpsertArgs<ExtArgs>>): Prisma__purchasedproductsClient<$Result.GetResult<Prisma.$purchasedproductsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Purchasedproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasedproductsCountArgs} args - Arguments to filter Purchasedproducts to count.
     * @example
     * // Count the number of Purchasedproducts
     * const count = await prisma.purchasedproducts.count({
     *   where: {
     *     // ... the filter for the Purchasedproducts we want to count
     *   }
     * })
    **/
    count<T extends purchasedproductsCountArgs>(
      args?: Subset<T, purchasedproductsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchasedproductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchasedproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchasedproductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchasedproductsAggregateArgs>(args: Subset<T, PurchasedproductsAggregateArgs>): Prisma.PrismaPromise<GetPurchasedproductsAggregateType<T>>

    /**
     * Group by Purchasedproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasedproductsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends purchasedproductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: purchasedproductsGroupByArgs['orderBy'] }
        : { orderBy?: purchasedproductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, purchasedproductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchasedproductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the purchasedproducts model
   */
  readonly fields: purchasedproductsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for purchasedproducts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__purchasedproductsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the purchasedproducts model
   */
  interface purchasedproductsFieldRefs {
    readonly id: FieldRef<"purchasedproducts", 'String'>
    readonly purchase: FieldRef<"purchasedproducts", 'String'>
    readonly product: FieldRef<"purchasedproducts", 'String'>
    readonly quantity: FieldRef<"purchasedproducts", 'Int'>
    readonly totalAmount: FieldRef<"purchasedproducts", 'Float'>
    readonly source: FieldRef<"purchasedproducts", 'String'>
    readonly createdAt: FieldRef<"purchasedproducts", 'DateTime'>
    readonly updatedAt: FieldRef<"purchasedproducts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * purchasedproducts findUnique
   */
  export type purchasedproductsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * Filter, which purchasedproducts to fetch.
     */
    where: purchasedproductsWhereUniqueInput
  }

  /**
   * purchasedproducts findUniqueOrThrow
   */
  export type purchasedproductsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * Filter, which purchasedproducts to fetch.
     */
    where: purchasedproductsWhereUniqueInput
  }

  /**
   * purchasedproducts findFirst
   */
  export type purchasedproductsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * Filter, which purchasedproducts to fetch.
     */
    where?: purchasedproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchasedproducts to fetch.
     */
    orderBy?: purchasedproductsOrderByWithRelationInput | purchasedproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for purchasedproducts.
     */
    cursor?: purchasedproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchasedproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchasedproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchasedproducts.
     */
    distinct?: PurchasedproductsScalarFieldEnum | PurchasedproductsScalarFieldEnum[]
  }

  /**
   * purchasedproducts findFirstOrThrow
   */
  export type purchasedproductsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * Filter, which purchasedproducts to fetch.
     */
    where?: purchasedproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchasedproducts to fetch.
     */
    orderBy?: purchasedproductsOrderByWithRelationInput | purchasedproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for purchasedproducts.
     */
    cursor?: purchasedproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchasedproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchasedproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchasedproducts.
     */
    distinct?: PurchasedproductsScalarFieldEnum | PurchasedproductsScalarFieldEnum[]
  }

  /**
   * purchasedproducts findMany
   */
  export type purchasedproductsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * Filter, which purchasedproducts to fetch.
     */
    where?: purchasedproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchasedproducts to fetch.
     */
    orderBy?: purchasedproductsOrderByWithRelationInput | purchasedproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing purchasedproducts.
     */
    cursor?: purchasedproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchasedproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchasedproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchasedproducts.
     */
    distinct?: PurchasedproductsScalarFieldEnum | PurchasedproductsScalarFieldEnum[]
  }

  /**
   * purchasedproducts create
   */
  export type purchasedproductsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * The data needed to create a purchasedproducts.
     */
    data: XOR<purchasedproductsCreateInput, purchasedproductsUncheckedCreateInput>
  }

  /**
   * purchasedproducts createMany
   */
  export type purchasedproductsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many purchasedproducts.
     */
    data: purchasedproductsCreateManyInput | purchasedproductsCreateManyInput[]
  }

  /**
   * purchasedproducts createManyAndReturn
   */
  export type purchasedproductsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * The data used to create many purchasedproducts.
     */
    data: purchasedproductsCreateManyInput | purchasedproductsCreateManyInput[]
  }

  /**
   * purchasedproducts update
   */
  export type purchasedproductsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * The data needed to update a purchasedproducts.
     */
    data: XOR<purchasedproductsUpdateInput, purchasedproductsUncheckedUpdateInput>
    /**
     * Choose, which purchasedproducts to update.
     */
    where: purchasedproductsWhereUniqueInput
  }

  /**
   * purchasedproducts updateMany
   */
  export type purchasedproductsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update purchasedproducts.
     */
    data: XOR<purchasedproductsUpdateManyMutationInput, purchasedproductsUncheckedUpdateManyInput>
    /**
     * Filter which purchasedproducts to update
     */
    where?: purchasedproductsWhereInput
    /**
     * Limit how many purchasedproducts to update.
     */
    limit?: number
  }

  /**
   * purchasedproducts updateManyAndReturn
   */
  export type purchasedproductsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * The data used to update purchasedproducts.
     */
    data: XOR<purchasedproductsUpdateManyMutationInput, purchasedproductsUncheckedUpdateManyInput>
    /**
     * Filter which purchasedproducts to update
     */
    where?: purchasedproductsWhereInput
    /**
     * Limit how many purchasedproducts to update.
     */
    limit?: number
  }

  /**
   * purchasedproducts upsert
   */
  export type purchasedproductsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * The filter to search for the purchasedproducts to update in case it exists.
     */
    where: purchasedproductsWhereUniqueInput
    /**
     * In case the purchasedproducts found by the `where` argument doesn't exist, create a new purchasedproducts with this data.
     */
    create: XOR<purchasedproductsCreateInput, purchasedproductsUncheckedCreateInput>
    /**
     * In case the purchasedproducts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<purchasedproductsUpdateInput, purchasedproductsUncheckedUpdateInput>
  }

  /**
   * purchasedproducts delete
   */
  export type purchasedproductsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
    /**
     * Filter which purchasedproducts to delete.
     */
    where: purchasedproductsWhereUniqueInput
  }

  /**
   * purchasedproducts deleteMany
   */
  export type purchasedproductsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which purchasedproducts to delete
     */
    where?: purchasedproductsWhereInput
    /**
     * Limit how many purchasedproducts to delete.
     */
    limit?: number
  }

  /**
   * purchasedproducts without action
   */
  export type purchasedproductsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchasedproducts
     */
    select?: purchasedproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchasedproducts
     */
    omit?: purchasedproductsOmit<ExtArgs> | null
  }


  /**
   * Model sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    user: string | null
    customer: string | null
    invoicenum: string | null
    discountpercentage: string | null
    totalprice: string | null
    totalpayment: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    user: string | null
    customer: string | null
    invoicenum: string | null
    discountpercentage: string | null
    totalprice: string | null
    totalpayment: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    user: number
    customer: number
    invoicenum: number
    discountpercentage: number
    totalprice: number
    totalpayment: number
    createdby: number
    updatedby: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SaleMinAggregateInputType = {
    id?: true
    user?: true
    customer?: true
    invoicenum?: true
    discountpercentage?: true
    totalprice?: true
    totalpayment?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    user?: true
    customer?: true
    invoicenum?: true
    discountpercentage?: true
    totalprice?: true
    totalpayment?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    user?: true
    customer?: true
    invoicenum?: true
    discountpercentage?: true
    totalprice?: true
    totalpayment?: true
    createdby?: true
    updatedby?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sale to aggregate.
     */
    where?: saleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales to fetch.
     */
    orderBy?: saleOrderByWithRelationInput | saleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: saleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type saleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: saleWhereInput
    orderBy?: saleOrderByWithAggregationInput | saleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: saleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    user: string | null
    customer: string | null
    invoicenum: string | null
    discountpercentage: string | null
    totalprice: string | null
    totalpayment: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: SaleCountAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends saleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type saleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    customer?: boolean
    invoicenum?: boolean
    discountpercentage?: boolean
    totalprice?: boolean
    totalpayment?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sale"]>

  export type saleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    customer?: boolean
    invoicenum?: boolean
    discountpercentage?: boolean
    totalprice?: boolean
    totalpayment?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sale"]>

  export type saleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    customer?: boolean
    invoicenum?: boolean
    discountpercentage?: boolean
    totalprice?: boolean
    totalpayment?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sale"]>

  export type saleSelectScalar = {
    id?: boolean
    user?: boolean
    customer?: boolean
    invoicenum?: boolean
    discountpercentage?: boolean
    totalprice?: boolean
    totalpayment?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type saleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user" | "customer" | "invoicenum" | "discountpercentage" | "totalprice" | "totalpayment" | "createdby" | "updatedby" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["sale"]>

  export type $salePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sale"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user: string | null
      customer: string | null
      invoicenum: string | null
      discountpercentage: string | null
      totalprice: string | null
      totalpayment: string | null
      createdby: string | null
      updatedby: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type saleGetPayload<S extends boolean | null | undefined | saleDefaultArgs> = $Result.GetResult<Prisma.$salePayload, S>

  type saleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<saleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface saleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sale'], meta: { name: 'sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {saleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends saleFindUniqueArgs>(args: SelectSubset<T, saleFindUniqueArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {saleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends saleFindUniqueOrThrowArgs>(args: SelectSubset<T, saleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {saleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends saleFindFirstArgs>(args?: SelectSubset<T, saleFindFirstArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {saleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends saleFindFirstOrThrowArgs>(args?: SelectSubset<T, saleFindFirstOrThrowArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {saleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends saleFindManyArgs>(args?: SelectSubset<T, saleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sale.
     * @param {saleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends saleCreateArgs>(args: SelectSubset<T, saleCreateArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales.
     * @param {saleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends saleCreateManyArgs>(args?: SelectSubset<T, saleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {saleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends saleCreateManyAndReturnArgs>(args?: SelectSubset<T, saleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sale.
     * @param {saleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends saleDeleteArgs>(args: SelectSubset<T, saleDeleteArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sale.
     * @param {saleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends saleUpdateArgs>(args: SelectSubset<T, saleUpdateArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales.
     * @param {saleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends saleDeleteManyArgs>(args?: SelectSubset<T, saleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {saleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends saleUpdateManyArgs>(args: SelectSubset<T, saleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales and returns the data updated in the database.
     * @param {saleUpdateManyAndReturnArgs} args - Arguments to update many Sales.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends saleUpdateManyAndReturnArgs>(args: SelectSubset<T, saleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sale.
     * @param {saleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends saleUpsertArgs>(args: SelectSubset<T, saleUpsertArgs<ExtArgs>>): Prisma__saleClient<$Result.GetResult<Prisma.$salePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {saleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends saleCountArgs>(
      args?: Subset<T, saleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {saleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends saleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: saleGroupByArgs['orderBy'] }
        : { orderBy?: saleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, saleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sale model
   */
  readonly fields: saleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__saleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sale model
   */
  interface saleFieldRefs {
    readonly id: FieldRef<"sale", 'String'>
    readonly user: FieldRef<"sale", 'String'>
    readonly customer: FieldRef<"sale", 'String'>
    readonly invoicenum: FieldRef<"sale", 'String'>
    readonly discountpercentage: FieldRef<"sale", 'String'>
    readonly totalprice: FieldRef<"sale", 'String'>
    readonly totalpayment: FieldRef<"sale", 'String'>
    readonly createdby: FieldRef<"sale", 'String'>
    readonly updatedby: FieldRef<"sale", 'String'>
    readonly source: FieldRef<"sale", 'String'>
    readonly createdAt: FieldRef<"sale", 'DateTime'>
    readonly updatedAt: FieldRef<"sale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sale findUnique
   */
  export type saleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * Filter, which sale to fetch.
     */
    where: saleWhereUniqueInput
  }

  /**
   * sale findUniqueOrThrow
   */
  export type saleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * Filter, which sale to fetch.
     */
    where: saleWhereUniqueInput
  }

  /**
   * sale findFirst
   */
  export type saleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * Filter, which sale to fetch.
     */
    where?: saleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales to fetch.
     */
    orderBy?: saleOrderByWithRelationInput | saleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sales.
     */
    cursor?: saleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * sale findFirstOrThrow
   */
  export type saleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * Filter, which sale to fetch.
     */
    where?: saleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales to fetch.
     */
    orderBy?: saleOrderByWithRelationInput | saleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sales.
     */
    cursor?: saleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * sale findMany
   */
  export type saleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * Filter, which sales to fetch.
     */
    where?: saleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sales to fetch.
     */
    orderBy?: saleOrderByWithRelationInput | saleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sales.
     */
    cursor?: saleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * sale create
   */
  export type saleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * The data needed to create a sale.
     */
    data: XOR<saleCreateInput, saleUncheckedCreateInput>
  }

  /**
   * sale createMany
   */
  export type saleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sales.
     */
    data: saleCreateManyInput | saleCreateManyInput[]
  }

  /**
   * sale createManyAndReturn
   */
  export type saleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * The data used to create many sales.
     */
    data: saleCreateManyInput | saleCreateManyInput[]
  }

  /**
   * sale update
   */
  export type saleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * The data needed to update a sale.
     */
    data: XOR<saleUpdateInput, saleUncheckedUpdateInput>
    /**
     * Choose, which sale to update.
     */
    where: saleWhereUniqueInput
  }

  /**
   * sale updateMany
   */
  export type saleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sales.
     */
    data: XOR<saleUpdateManyMutationInput, saleUncheckedUpdateManyInput>
    /**
     * Filter which sales to update
     */
    where?: saleWhereInput
    /**
     * Limit how many sales to update.
     */
    limit?: number
  }

  /**
   * sale updateManyAndReturn
   */
  export type saleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * The data used to update sales.
     */
    data: XOR<saleUpdateManyMutationInput, saleUncheckedUpdateManyInput>
    /**
     * Filter which sales to update
     */
    where?: saleWhereInput
    /**
     * Limit how many sales to update.
     */
    limit?: number
  }

  /**
   * sale upsert
   */
  export type saleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * The filter to search for the sale to update in case it exists.
     */
    where: saleWhereUniqueInput
    /**
     * In case the sale found by the `where` argument doesn't exist, create a new sale with this data.
     */
    create: XOR<saleCreateInput, saleUncheckedCreateInput>
    /**
     * In case the sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<saleUpdateInput, saleUncheckedUpdateInput>
  }

  /**
   * sale delete
   */
  export type saleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
    /**
     * Filter which sale to delete.
     */
    where: saleWhereUniqueInput
  }

  /**
   * sale deleteMany
   */
  export type saleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sales to delete
     */
    where?: saleWhereInput
    /**
     * Limit how many sales to delete.
     */
    limit?: number
  }

  /**
   * sale without action
   */
  export type saleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sale
     */
    select?: saleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sale
     */
    omit?: saleOmit<ExtArgs> | null
  }


  /**
   * Model softwaresetting
   */

  export type AggregateSoftwaresetting = {
    _count: SoftwaresettingCountAggregateOutputType | null
    _min: SoftwaresettingMinAggregateOutputType | null
    _max: SoftwaresettingMaxAggregateOutputType | null
  }

  export type SoftwaresettingMinAggregateOutputType = {
    id: string | null
    name: string | null
    value: string | null
    source: string | null
  }

  export type SoftwaresettingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    value: string | null
    source: string | null
  }

  export type SoftwaresettingCountAggregateOutputType = {
    id: number
    name: number
    value: number
    source: number
    _all: number
  }


  export type SoftwaresettingMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
    source?: true
  }

  export type SoftwaresettingMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
    source?: true
  }

  export type SoftwaresettingCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    source?: true
    _all?: true
  }

  export type SoftwaresettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which softwaresetting to aggregate.
     */
    where?: softwaresettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of softwaresettings to fetch.
     */
    orderBy?: softwaresettingOrderByWithRelationInput | softwaresettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: softwaresettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` softwaresettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` softwaresettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned softwaresettings
    **/
    _count?: true | SoftwaresettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoftwaresettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoftwaresettingMaxAggregateInputType
  }

  export type GetSoftwaresettingAggregateType<T extends SoftwaresettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSoftwaresetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoftwaresetting[P]>
      : GetScalarType<T[P], AggregateSoftwaresetting[P]>
  }




  export type softwaresettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: softwaresettingWhereInput
    orderBy?: softwaresettingOrderByWithAggregationInput | softwaresettingOrderByWithAggregationInput[]
    by: SoftwaresettingScalarFieldEnum[] | SoftwaresettingScalarFieldEnum
    having?: softwaresettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoftwaresettingCountAggregateInputType | true
    _min?: SoftwaresettingMinAggregateInputType
    _max?: SoftwaresettingMaxAggregateInputType
  }

  export type SoftwaresettingGroupByOutputType = {
    id: string
    name: string | null
    value: string | null
    source: string | null
    _count: SoftwaresettingCountAggregateOutputType | null
    _min: SoftwaresettingMinAggregateOutputType | null
    _max: SoftwaresettingMaxAggregateOutputType | null
  }

  type GetSoftwaresettingGroupByPayload<T extends softwaresettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoftwaresettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoftwaresettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoftwaresettingGroupByOutputType[P]>
            : GetScalarType<T[P], SoftwaresettingGroupByOutputType[P]>
        }
      >
    >


  export type softwaresettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    source?: boolean
  }, ExtArgs["result"]["softwaresetting"]>

  export type softwaresettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    source?: boolean
  }, ExtArgs["result"]["softwaresetting"]>

  export type softwaresettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    source?: boolean
  }, ExtArgs["result"]["softwaresetting"]>

  export type softwaresettingSelectScalar = {
    id?: boolean
    name?: boolean
    value?: boolean
    source?: boolean
  }

  export type softwaresettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "value" | "source", ExtArgs["result"]["softwaresetting"]>

  export type $softwaresettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "softwaresetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      value: string | null
      source: string | null
    }, ExtArgs["result"]["softwaresetting"]>
    composites: {}
  }

  type softwaresettingGetPayload<S extends boolean | null | undefined | softwaresettingDefaultArgs> = $Result.GetResult<Prisma.$softwaresettingPayload, S>

  type softwaresettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<softwaresettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoftwaresettingCountAggregateInputType | true
    }

  export interface softwaresettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['softwaresetting'], meta: { name: 'softwaresetting' } }
    /**
     * Find zero or one Softwaresetting that matches the filter.
     * @param {softwaresettingFindUniqueArgs} args - Arguments to find a Softwaresetting
     * @example
     * // Get one Softwaresetting
     * const softwaresetting = await prisma.softwaresetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends softwaresettingFindUniqueArgs>(args: SelectSubset<T, softwaresettingFindUniqueArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Softwaresetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {softwaresettingFindUniqueOrThrowArgs} args - Arguments to find a Softwaresetting
     * @example
     * // Get one Softwaresetting
     * const softwaresetting = await prisma.softwaresetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends softwaresettingFindUniqueOrThrowArgs>(args: SelectSubset<T, softwaresettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Softwaresetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {softwaresettingFindFirstArgs} args - Arguments to find a Softwaresetting
     * @example
     * // Get one Softwaresetting
     * const softwaresetting = await prisma.softwaresetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends softwaresettingFindFirstArgs>(args?: SelectSubset<T, softwaresettingFindFirstArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Softwaresetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {softwaresettingFindFirstOrThrowArgs} args - Arguments to find a Softwaresetting
     * @example
     * // Get one Softwaresetting
     * const softwaresetting = await prisma.softwaresetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends softwaresettingFindFirstOrThrowArgs>(args?: SelectSubset<T, softwaresettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Softwaresettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {softwaresettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Softwaresettings
     * const softwaresettings = await prisma.softwaresetting.findMany()
     * 
     * // Get first 10 Softwaresettings
     * const softwaresettings = await prisma.softwaresetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const softwaresettingWithIdOnly = await prisma.softwaresetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends softwaresettingFindManyArgs>(args?: SelectSubset<T, softwaresettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Softwaresetting.
     * @param {softwaresettingCreateArgs} args - Arguments to create a Softwaresetting.
     * @example
     * // Create one Softwaresetting
     * const Softwaresetting = await prisma.softwaresetting.create({
     *   data: {
     *     // ... data to create a Softwaresetting
     *   }
     * })
     * 
     */
    create<T extends softwaresettingCreateArgs>(args: SelectSubset<T, softwaresettingCreateArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Softwaresettings.
     * @param {softwaresettingCreateManyArgs} args - Arguments to create many Softwaresettings.
     * @example
     * // Create many Softwaresettings
     * const softwaresetting = await prisma.softwaresetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends softwaresettingCreateManyArgs>(args?: SelectSubset<T, softwaresettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Softwaresettings and returns the data saved in the database.
     * @param {softwaresettingCreateManyAndReturnArgs} args - Arguments to create many Softwaresettings.
     * @example
     * // Create many Softwaresettings
     * const softwaresetting = await prisma.softwaresetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Softwaresettings and only return the `id`
     * const softwaresettingWithIdOnly = await prisma.softwaresetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends softwaresettingCreateManyAndReturnArgs>(args?: SelectSubset<T, softwaresettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Softwaresetting.
     * @param {softwaresettingDeleteArgs} args - Arguments to delete one Softwaresetting.
     * @example
     * // Delete one Softwaresetting
     * const Softwaresetting = await prisma.softwaresetting.delete({
     *   where: {
     *     // ... filter to delete one Softwaresetting
     *   }
     * })
     * 
     */
    delete<T extends softwaresettingDeleteArgs>(args: SelectSubset<T, softwaresettingDeleteArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Softwaresetting.
     * @param {softwaresettingUpdateArgs} args - Arguments to update one Softwaresetting.
     * @example
     * // Update one Softwaresetting
     * const softwaresetting = await prisma.softwaresetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends softwaresettingUpdateArgs>(args: SelectSubset<T, softwaresettingUpdateArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Softwaresettings.
     * @param {softwaresettingDeleteManyArgs} args - Arguments to filter Softwaresettings to delete.
     * @example
     * // Delete a few Softwaresettings
     * const { count } = await prisma.softwaresetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends softwaresettingDeleteManyArgs>(args?: SelectSubset<T, softwaresettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Softwaresettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {softwaresettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Softwaresettings
     * const softwaresetting = await prisma.softwaresetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends softwaresettingUpdateManyArgs>(args: SelectSubset<T, softwaresettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Softwaresettings and returns the data updated in the database.
     * @param {softwaresettingUpdateManyAndReturnArgs} args - Arguments to update many Softwaresettings.
     * @example
     * // Update many Softwaresettings
     * const softwaresetting = await prisma.softwaresetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Softwaresettings and only return the `id`
     * const softwaresettingWithIdOnly = await prisma.softwaresetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends softwaresettingUpdateManyAndReturnArgs>(args: SelectSubset<T, softwaresettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Softwaresetting.
     * @param {softwaresettingUpsertArgs} args - Arguments to update or create a Softwaresetting.
     * @example
     * // Update or create a Softwaresetting
     * const softwaresetting = await prisma.softwaresetting.upsert({
     *   create: {
     *     // ... data to create a Softwaresetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Softwaresetting we want to update
     *   }
     * })
     */
    upsert<T extends softwaresettingUpsertArgs>(args: SelectSubset<T, softwaresettingUpsertArgs<ExtArgs>>): Prisma__softwaresettingClient<$Result.GetResult<Prisma.$softwaresettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Softwaresettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {softwaresettingCountArgs} args - Arguments to filter Softwaresettings to count.
     * @example
     * // Count the number of Softwaresettings
     * const count = await prisma.softwaresetting.count({
     *   where: {
     *     // ... the filter for the Softwaresettings we want to count
     *   }
     * })
    **/
    count<T extends softwaresettingCountArgs>(
      args?: Subset<T, softwaresettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoftwaresettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Softwaresetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwaresettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SoftwaresettingAggregateArgs>(args: Subset<T, SoftwaresettingAggregateArgs>): Prisma.PrismaPromise<GetSoftwaresettingAggregateType<T>>

    /**
     * Group by Softwaresetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {softwaresettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends softwaresettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: softwaresettingGroupByArgs['orderBy'] }
        : { orderBy?: softwaresettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, softwaresettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoftwaresettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the softwaresetting model
   */
  readonly fields: softwaresettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for softwaresetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__softwaresettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the softwaresetting model
   */
  interface softwaresettingFieldRefs {
    readonly id: FieldRef<"softwaresetting", 'String'>
    readonly name: FieldRef<"softwaresetting", 'String'>
    readonly value: FieldRef<"softwaresetting", 'String'>
    readonly source: FieldRef<"softwaresetting", 'String'>
  }
    

  // Custom InputTypes
  /**
   * softwaresetting findUnique
   */
  export type softwaresettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * Filter, which softwaresetting to fetch.
     */
    where: softwaresettingWhereUniqueInput
  }

  /**
   * softwaresetting findUniqueOrThrow
   */
  export type softwaresettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * Filter, which softwaresetting to fetch.
     */
    where: softwaresettingWhereUniqueInput
  }

  /**
   * softwaresetting findFirst
   */
  export type softwaresettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * Filter, which softwaresetting to fetch.
     */
    where?: softwaresettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of softwaresettings to fetch.
     */
    orderBy?: softwaresettingOrderByWithRelationInput | softwaresettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for softwaresettings.
     */
    cursor?: softwaresettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` softwaresettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` softwaresettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of softwaresettings.
     */
    distinct?: SoftwaresettingScalarFieldEnum | SoftwaresettingScalarFieldEnum[]
  }

  /**
   * softwaresetting findFirstOrThrow
   */
  export type softwaresettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * Filter, which softwaresetting to fetch.
     */
    where?: softwaresettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of softwaresettings to fetch.
     */
    orderBy?: softwaresettingOrderByWithRelationInput | softwaresettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for softwaresettings.
     */
    cursor?: softwaresettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` softwaresettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` softwaresettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of softwaresettings.
     */
    distinct?: SoftwaresettingScalarFieldEnum | SoftwaresettingScalarFieldEnum[]
  }

  /**
   * softwaresetting findMany
   */
  export type softwaresettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * Filter, which softwaresettings to fetch.
     */
    where?: softwaresettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of softwaresettings to fetch.
     */
    orderBy?: softwaresettingOrderByWithRelationInput | softwaresettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing softwaresettings.
     */
    cursor?: softwaresettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` softwaresettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` softwaresettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of softwaresettings.
     */
    distinct?: SoftwaresettingScalarFieldEnum | SoftwaresettingScalarFieldEnum[]
  }

  /**
   * softwaresetting create
   */
  export type softwaresettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * The data needed to create a softwaresetting.
     */
    data: XOR<softwaresettingCreateInput, softwaresettingUncheckedCreateInput>
  }

  /**
   * softwaresetting createMany
   */
  export type softwaresettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many softwaresettings.
     */
    data: softwaresettingCreateManyInput | softwaresettingCreateManyInput[]
  }

  /**
   * softwaresetting createManyAndReturn
   */
  export type softwaresettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * The data used to create many softwaresettings.
     */
    data: softwaresettingCreateManyInput | softwaresettingCreateManyInput[]
  }

  /**
   * softwaresetting update
   */
  export type softwaresettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * The data needed to update a softwaresetting.
     */
    data: XOR<softwaresettingUpdateInput, softwaresettingUncheckedUpdateInput>
    /**
     * Choose, which softwaresetting to update.
     */
    where: softwaresettingWhereUniqueInput
  }

  /**
   * softwaresetting updateMany
   */
  export type softwaresettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update softwaresettings.
     */
    data: XOR<softwaresettingUpdateManyMutationInput, softwaresettingUncheckedUpdateManyInput>
    /**
     * Filter which softwaresettings to update
     */
    where?: softwaresettingWhereInput
    /**
     * Limit how many softwaresettings to update.
     */
    limit?: number
  }

  /**
   * softwaresetting updateManyAndReturn
   */
  export type softwaresettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * The data used to update softwaresettings.
     */
    data: XOR<softwaresettingUpdateManyMutationInput, softwaresettingUncheckedUpdateManyInput>
    /**
     * Filter which softwaresettings to update
     */
    where?: softwaresettingWhereInput
    /**
     * Limit how many softwaresettings to update.
     */
    limit?: number
  }

  /**
   * softwaresetting upsert
   */
  export type softwaresettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * The filter to search for the softwaresetting to update in case it exists.
     */
    where: softwaresettingWhereUniqueInput
    /**
     * In case the softwaresetting found by the `where` argument doesn't exist, create a new softwaresetting with this data.
     */
    create: XOR<softwaresettingCreateInput, softwaresettingUncheckedCreateInput>
    /**
     * In case the softwaresetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<softwaresettingUpdateInput, softwaresettingUncheckedUpdateInput>
  }

  /**
   * softwaresetting delete
   */
  export type softwaresettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
    /**
     * Filter which softwaresetting to delete.
     */
    where: softwaresettingWhereUniqueInput
  }

  /**
   * softwaresetting deleteMany
   */
  export type softwaresettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which softwaresettings to delete
     */
    where?: softwaresettingWhereInput
    /**
     * Limit how many softwaresettings to delete.
     */
    limit?: number
  }

  /**
   * softwaresetting without action
   */
  export type softwaresettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the softwaresetting
     */
    select?: softwaresettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the softwaresetting
     */
    omit?: softwaresettingOmit<ExtArgs> | null
  }


  /**
   * Model soldproducts
   */

  export type AggregateSoldproducts = {
    _count: SoldproductsCountAggregateOutputType | null
    _avg: SoldproductsAvgAggregateOutputType | null
    _sum: SoldproductsSumAggregateOutputType | null
    _min: SoldproductsMinAggregateOutputType | null
    _max: SoldproductsMaxAggregateOutputType | null
  }

  export type SoldproductsAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type SoldproductsSumAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type SoldproductsMinAggregateOutputType = {
    id: string | null
    sale: string | null
    product: string | null
    quantity: number | null
    price: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SoldproductsMaxAggregateOutputType = {
    id: string | null
    sale: string | null
    product: string | null
    quantity: number | null
    price: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SoldproductsCountAggregateOutputType = {
    id: number
    sale: number
    product: number
    quantity: number
    price: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SoldproductsAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type SoldproductsSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type SoldproductsMinAggregateInputType = {
    id?: true
    sale?: true
    product?: true
    quantity?: true
    price?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SoldproductsMaxAggregateInputType = {
    id?: true
    sale?: true
    product?: true
    quantity?: true
    price?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SoldproductsCountAggregateInputType = {
    id?: true
    sale?: true
    product?: true
    quantity?: true
    price?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SoldproductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which soldproducts to aggregate.
     */
    where?: soldproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldproducts to fetch.
     */
    orderBy?: soldproductsOrderByWithRelationInput | soldproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: soldproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned soldproducts
    **/
    _count?: true | SoldproductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SoldproductsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SoldproductsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoldproductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoldproductsMaxAggregateInputType
  }

  export type GetSoldproductsAggregateType<T extends SoldproductsAggregateArgs> = {
        [P in keyof T & keyof AggregateSoldproducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoldproducts[P]>
      : GetScalarType<T[P], AggregateSoldproducts[P]>
  }




  export type soldproductsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: soldproductsWhereInput
    orderBy?: soldproductsOrderByWithAggregationInput | soldproductsOrderByWithAggregationInput[]
    by: SoldproductsScalarFieldEnum[] | SoldproductsScalarFieldEnum
    having?: soldproductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoldproductsCountAggregateInputType | true
    _avg?: SoldproductsAvgAggregateInputType
    _sum?: SoldproductsSumAggregateInputType
    _min?: SoldproductsMinAggregateInputType
    _max?: SoldproductsMaxAggregateInputType
  }

  export type SoldproductsGroupByOutputType = {
    id: string
    sale: string | null
    product: string | null
    quantity: number | null
    price: number | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: SoldproductsCountAggregateOutputType | null
    _avg: SoldproductsAvgAggregateOutputType | null
    _sum: SoldproductsSumAggregateOutputType | null
    _min: SoldproductsMinAggregateOutputType | null
    _max: SoldproductsMaxAggregateOutputType | null
  }

  type GetSoldproductsGroupByPayload<T extends soldproductsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoldproductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoldproductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoldproductsGroupByOutputType[P]>
            : GetScalarType<T[P], SoldproductsGroupByOutputType[P]>
        }
      >
    >


  export type soldproductsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sale?: boolean
    product?: boolean
    quantity?: boolean
    price?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldproducts"]>

  export type soldproductsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sale?: boolean
    product?: boolean
    quantity?: boolean
    price?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldproducts"]>

  export type soldproductsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sale?: boolean
    product?: boolean
    quantity?: boolean
    price?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldproducts"]>

  export type soldproductsSelectScalar = {
    id?: boolean
    sale?: boolean
    product?: boolean
    quantity?: boolean
    price?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type soldproductsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sale" | "product" | "quantity" | "price" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["soldproducts"]>

  export type $soldproductsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "soldproducts"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sale: string | null
      product: string | null
      quantity: number | null
      price: number | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["soldproducts"]>
    composites: {}
  }

  type soldproductsGetPayload<S extends boolean | null | undefined | soldproductsDefaultArgs> = $Result.GetResult<Prisma.$soldproductsPayload, S>

  type soldproductsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<soldproductsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoldproductsCountAggregateInputType | true
    }

  export interface soldproductsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['soldproducts'], meta: { name: 'soldproducts' } }
    /**
     * Find zero or one Soldproducts that matches the filter.
     * @param {soldproductsFindUniqueArgs} args - Arguments to find a Soldproducts
     * @example
     * // Get one Soldproducts
     * const soldproducts = await prisma.soldproducts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends soldproductsFindUniqueArgs>(args: SelectSubset<T, soldproductsFindUniqueArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Soldproducts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {soldproductsFindUniqueOrThrowArgs} args - Arguments to find a Soldproducts
     * @example
     * // Get one Soldproducts
     * const soldproducts = await prisma.soldproducts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends soldproductsFindUniqueOrThrowArgs>(args: SelectSubset<T, soldproductsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Soldproducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldproductsFindFirstArgs} args - Arguments to find a Soldproducts
     * @example
     * // Get one Soldproducts
     * const soldproducts = await prisma.soldproducts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends soldproductsFindFirstArgs>(args?: SelectSubset<T, soldproductsFindFirstArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Soldproducts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldproductsFindFirstOrThrowArgs} args - Arguments to find a Soldproducts
     * @example
     * // Get one Soldproducts
     * const soldproducts = await prisma.soldproducts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends soldproductsFindFirstOrThrowArgs>(args?: SelectSubset<T, soldproductsFindFirstOrThrowArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Soldproducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldproductsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Soldproducts
     * const soldproducts = await prisma.soldproducts.findMany()
     * 
     * // Get first 10 Soldproducts
     * const soldproducts = await prisma.soldproducts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const soldproductsWithIdOnly = await prisma.soldproducts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends soldproductsFindManyArgs>(args?: SelectSubset<T, soldproductsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Soldproducts.
     * @param {soldproductsCreateArgs} args - Arguments to create a Soldproducts.
     * @example
     * // Create one Soldproducts
     * const Soldproducts = await prisma.soldproducts.create({
     *   data: {
     *     // ... data to create a Soldproducts
     *   }
     * })
     * 
     */
    create<T extends soldproductsCreateArgs>(args: SelectSubset<T, soldproductsCreateArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Soldproducts.
     * @param {soldproductsCreateManyArgs} args - Arguments to create many Soldproducts.
     * @example
     * // Create many Soldproducts
     * const soldproducts = await prisma.soldproducts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends soldproductsCreateManyArgs>(args?: SelectSubset<T, soldproductsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Soldproducts and returns the data saved in the database.
     * @param {soldproductsCreateManyAndReturnArgs} args - Arguments to create many Soldproducts.
     * @example
     * // Create many Soldproducts
     * const soldproducts = await prisma.soldproducts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Soldproducts and only return the `id`
     * const soldproductsWithIdOnly = await prisma.soldproducts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends soldproductsCreateManyAndReturnArgs>(args?: SelectSubset<T, soldproductsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Soldproducts.
     * @param {soldproductsDeleteArgs} args - Arguments to delete one Soldproducts.
     * @example
     * // Delete one Soldproducts
     * const Soldproducts = await prisma.soldproducts.delete({
     *   where: {
     *     // ... filter to delete one Soldproducts
     *   }
     * })
     * 
     */
    delete<T extends soldproductsDeleteArgs>(args: SelectSubset<T, soldproductsDeleteArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Soldproducts.
     * @param {soldproductsUpdateArgs} args - Arguments to update one Soldproducts.
     * @example
     * // Update one Soldproducts
     * const soldproducts = await prisma.soldproducts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends soldproductsUpdateArgs>(args: SelectSubset<T, soldproductsUpdateArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Soldproducts.
     * @param {soldproductsDeleteManyArgs} args - Arguments to filter Soldproducts to delete.
     * @example
     * // Delete a few Soldproducts
     * const { count } = await prisma.soldproducts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends soldproductsDeleteManyArgs>(args?: SelectSubset<T, soldproductsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Soldproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldproductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Soldproducts
     * const soldproducts = await prisma.soldproducts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends soldproductsUpdateManyArgs>(args: SelectSubset<T, soldproductsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Soldproducts and returns the data updated in the database.
     * @param {soldproductsUpdateManyAndReturnArgs} args - Arguments to update many Soldproducts.
     * @example
     * // Update many Soldproducts
     * const soldproducts = await prisma.soldproducts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Soldproducts and only return the `id`
     * const soldproductsWithIdOnly = await prisma.soldproducts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends soldproductsUpdateManyAndReturnArgs>(args: SelectSubset<T, soldproductsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Soldproducts.
     * @param {soldproductsUpsertArgs} args - Arguments to update or create a Soldproducts.
     * @example
     * // Update or create a Soldproducts
     * const soldproducts = await prisma.soldproducts.upsert({
     *   create: {
     *     // ... data to create a Soldproducts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Soldproducts we want to update
     *   }
     * })
     */
    upsert<T extends soldproductsUpsertArgs>(args: SelectSubset<T, soldproductsUpsertArgs<ExtArgs>>): Prisma__soldproductsClient<$Result.GetResult<Prisma.$soldproductsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Soldproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldproductsCountArgs} args - Arguments to filter Soldproducts to count.
     * @example
     * // Count the number of Soldproducts
     * const count = await prisma.soldproducts.count({
     *   where: {
     *     // ... the filter for the Soldproducts we want to count
     *   }
     * })
    **/
    count<T extends soldproductsCountArgs>(
      args?: Subset<T, soldproductsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoldproductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Soldproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldproductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SoldproductsAggregateArgs>(args: Subset<T, SoldproductsAggregateArgs>): Prisma.PrismaPromise<GetSoldproductsAggregateType<T>>

    /**
     * Group by Soldproducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldproductsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends soldproductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: soldproductsGroupByArgs['orderBy'] }
        : { orderBy?: soldproductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, soldproductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoldproductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the soldproducts model
   */
  readonly fields: soldproductsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for soldproducts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__soldproductsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the soldproducts model
   */
  interface soldproductsFieldRefs {
    readonly id: FieldRef<"soldproducts", 'String'>
    readonly sale: FieldRef<"soldproducts", 'String'>
    readonly product: FieldRef<"soldproducts", 'String'>
    readonly quantity: FieldRef<"soldproducts", 'Int'>
    readonly price: FieldRef<"soldproducts", 'Float'>
    readonly source: FieldRef<"soldproducts", 'String'>
    readonly createdAt: FieldRef<"soldproducts", 'DateTime'>
    readonly updatedAt: FieldRef<"soldproducts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * soldproducts findUnique
   */
  export type soldproductsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * Filter, which soldproducts to fetch.
     */
    where: soldproductsWhereUniqueInput
  }

  /**
   * soldproducts findUniqueOrThrow
   */
  export type soldproductsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * Filter, which soldproducts to fetch.
     */
    where: soldproductsWhereUniqueInput
  }

  /**
   * soldproducts findFirst
   */
  export type soldproductsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * Filter, which soldproducts to fetch.
     */
    where?: soldproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldproducts to fetch.
     */
    orderBy?: soldproductsOrderByWithRelationInput | soldproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for soldproducts.
     */
    cursor?: soldproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of soldproducts.
     */
    distinct?: SoldproductsScalarFieldEnum | SoldproductsScalarFieldEnum[]
  }

  /**
   * soldproducts findFirstOrThrow
   */
  export type soldproductsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * Filter, which soldproducts to fetch.
     */
    where?: soldproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldproducts to fetch.
     */
    orderBy?: soldproductsOrderByWithRelationInput | soldproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for soldproducts.
     */
    cursor?: soldproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of soldproducts.
     */
    distinct?: SoldproductsScalarFieldEnum | SoldproductsScalarFieldEnum[]
  }

  /**
   * soldproducts findMany
   */
  export type soldproductsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * Filter, which soldproducts to fetch.
     */
    where?: soldproductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldproducts to fetch.
     */
    orderBy?: soldproductsOrderByWithRelationInput | soldproductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing soldproducts.
     */
    cursor?: soldproductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldproducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldproducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of soldproducts.
     */
    distinct?: SoldproductsScalarFieldEnum | SoldproductsScalarFieldEnum[]
  }

  /**
   * soldproducts create
   */
  export type soldproductsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * The data needed to create a soldproducts.
     */
    data: XOR<soldproductsCreateInput, soldproductsUncheckedCreateInput>
  }

  /**
   * soldproducts createMany
   */
  export type soldproductsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many soldproducts.
     */
    data: soldproductsCreateManyInput | soldproductsCreateManyInput[]
  }

  /**
   * soldproducts createManyAndReturn
   */
  export type soldproductsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * The data used to create many soldproducts.
     */
    data: soldproductsCreateManyInput | soldproductsCreateManyInput[]
  }

  /**
   * soldproducts update
   */
  export type soldproductsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * The data needed to update a soldproducts.
     */
    data: XOR<soldproductsUpdateInput, soldproductsUncheckedUpdateInput>
    /**
     * Choose, which soldproducts to update.
     */
    where: soldproductsWhereUniqueInput
  }

  /**
   * soldproducts updateMany
   */
  export type soldproductsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update soldproducts.
     */
    data: XOR<soldproductsUpdateManyMutationInput, soldproductsUncheckedUpdateManyInput>
    /**
     * Filter which soldproducts to update
     */
    where?: soldproductsWhereInput
    /**
     * Limit how many soldproducts to update.
     */
    limit?: number
  }

  /**
   * soldproducts updateManyAndReturn
   */
  export type soldproductsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * The data used to update soldproducts.
     */
    data: XOR<soldproductsUpdateManyMutationInput, soldproductsUncheckedUpdateManyInput>
    /**
     * Filter which soldproducts to update
     */
    where?: soldproductsWhereInput
    /**
     * Limit how many soldproducts to update.
     */
    limit?: number
  }

  /**
   * soldproducts upsert
   */
  export type soldproductsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * The filter to search for the soldproducts to update in case it exists.
     */
    where: soldproductsWhereUniqueInput
    /**
     * In case the soldproducts found by the `where` argument doesn't exist, create a new soldproducts with this data.
     */
    create: XOR<soldproductsCreateInput, soldproductsUncheckedCreateInput>
    /**
     * In case the soldproducts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<soldproductsUpdateInput, soldproductsUncheckedUpdateInput>
  }

  /**
   * soldproducts delete
   */
  export type soldproductsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
    /**
     * Filter which soldproducts to delete.
     */
    where: soldproductsWhereUniqueInput
  }

  /**
   * soldproducts deleteMany
   */
  export type soldproductsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which soldproducts to delete
     */
    where?: soldproductsWhereInput
    /**
     * Limit how many soldproducts to delete.
     */
    limit?: number
  }

  /**
   * soldproducts without action
   */
  export type soldproductsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldproducts
     */
    select?: soldproductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldproducts
     */
    omit?: soldproductsOmit<ExtArgs> | null
  }


  /**
   * Model taxes
   */

  export type AggregateTaxes = {
    _count: TaxesCountAggregateOutputType | null
    _avg: TaxesAvgAggregateOutputType | null
    _sum: TaxesSumAggregateOutputType | null
    _min: TaxesMinAggregateOutputType | null
    _max: TaxesMaxAggregateOutputType | null
  }

  export type TaxesAvgAggregateOutputType = {
    percentage: number | null
  }

  export type TaxesSumAggregateOutputType = {
    percentage: number | null
  }

  export type TaxesMinAggregateOutputType = {
    id: string | null
    name: string | null
    percentage: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaxesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    percentage: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaxesCountAggregateOutputType = {
    id: number
    name: number
    percentage: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaxesAvgAggregateInputType = {
    percentage?: true
  }

  export type TaxesSumAggregateInputType = {
    percentage?: true
  }

  export type TaxesMinAggregateInputType = {
    id?: true
    name?: true
    percentage?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaxesMaxAggregateInputType = {
    id?: true
    name?: true
    percentage?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaxesCountAggregateInputType = {
    id?: true
    name?: true
    percentage?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaxesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which taxes to aggregate.
     */
    where?: taxesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of taxes to fetch.
     */
    orderBy?: taxesOrderByWithRelationInput | taxesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: taxesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` taxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` taxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned taxes
    **/
    _count?: true | TaxesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaxesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaxesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaxesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaxesMaxAggregateInputType
  }

  export type GetTaxesAggregateType<T extends TaxesAggregateArgs> = {
        [P in keyof T & keyof AggregateTaxes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaxes[P]>
      : GetScalarType<T[P], AggregateTaxes[P]>
  }




  export type taxesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: taxesWhereInput
    orderBy?: taxesOrderByWithAggregationInput | taxesOrderByWithAggregationInput[]
    by: TaxesScalarFieldEnum[] | TaxesScalarFieldEnum
    having?: taxesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaxesCountAggregateInputType | true
    _avg?: TaxesAvgAggregateInputType
    _sum?: TaxesSumAggregateInputType
    _min?: TaxesMinAggregateInputType
    _max?: TaxesMaxAggregateInputType
  }

  export type TaxesGroupByOutputType = {
    id: string
    name: string | null
    percentage: number | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: TaxesCountAggregateOutputType | null
    _avg: TaxesAvgAggregateOutputType | null
    _sum: TaxesSumAggregateOutputType | null
    _min: TaxesMinAggregateOutputType | null
    _max: TaxesMaxAggregateOutputType | null
  }

  type GetTaxesGroupByPayload<T extends taxesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaxesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaxesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaxesGroupByOutputType[P]>
            : GetScalarType<T[P], TaxesGroupByOutputType[P]>
        }
      >
    >


  export type taxesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    percentage?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["taxes"]>

  export type taxesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    percentage?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["taxes"]>

  export type taxesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    percentage?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["taxes"]>

  export type taxesSelectScalar = {
    id?: boolean
    name?: boolean
    percentage?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type taxesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "percentage" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["taxes"]>

  export type $taxesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "taxes"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      percentage: number | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taxes"]>
    composites: {}
  }

  type taxesGetPayload<S extends boolean | null | undefined | taxesDefaultArgs> = $Result.GetResult<Prisma.$taxesPayload, S>

  type taxesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<taxesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaxesCountAggregateInputType | true
    }

  export interface taxesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['taxes'], meta: { name: 'taxes' } }
    /**
     * Find zero or one Taxes that matches the filter.
     * @param {taxesFindUniqueArgs} args - Arguments to find a Taxes
     * @example
     * // Get one Taxes
     * const taxes = await prisma.taxes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends taxesFindUniqueArgs>(args: SelectSubset<T, taxesFindUniqueArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Taxes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {taxesFindUniqueOrThrowArgs} args - Arguments to find a Taxes
     * @example
     * // Get one Taxes
     * const taxes = await prisma.taxes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends taxesFindUniqueOrThrowArgs>(args: SelectSubset<T, taxesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Taxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taxesFindFirstArgs} args - Arguments to find a Taxes
     * @example
     * // Get one Taxes
     * const taxes = await prisma.taxes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends taxesFindFirstArgs>(args?: SelectSubset<T, taxesFindFirstArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Taxes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taxesFindFirstOrThrowArgs} args - Arguments to find a Taxes
     * @example
     * // Get one Taxes
     * const taxes = await prisma.taxes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends taxesFindFirstOrThrowArgs>(args?: SelectSubset<T, taxesFindFirstOrThrowArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Taxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taxesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Taxes
     * const taxes = await prisma.taxes.findMany()
     * 
     * // Get first 10 Taxes
     * const taxes = await prisma.taxes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taxesWithIdOnly = await prisma.taxes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends taxesFindManyArgs>(args?: SelectSubset<T, taxesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Taxes.
     * @param {taxesCreateArgs} args - Arguments to create a Taxes.
     * @example
     * // Create one Taxes
     * const Taxes = await prisma.taxes.create({
     *   data: {
     *     // ... data to create a Taxes
     *   }
     * })
     * 
     */
    create<T extends taxesCreateArgs>(args: SelectSubset<T, taxesCreateArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Taxes.
     * @param {taxesCreateManyArgs} args - Arguments to create many Taxes.
     * @example
     * // Create many Taxes
     * const taxes = await prisma.taxes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends taxesCreateManyArgs>(args?: SelectSubset<T, taxesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Taxes and returns the data saved in the database.
     * @param {taxesCreateManyAndReturnArgs} args - Arguments to create many Taxes.
     * @example
     * // Create many Taxes
     * const taxes = await prisma.taxes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Taxes and only return the `id`
     * const taxesWithIdOnly = await prisma.taxes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends taxesCreateManyAndReturnArgs>(args?: SelectSubset<T, taxesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Taxes.
     * @param {taxesDeleteArgs} args - Arguments to delete one Taxes.
     * @example
     * // Delete one Taxes
     * const Taxes = await prisma.taxes.delete({
     *   where: {
     *     // ... filter to delete one Taxes
     *   }
     * })
     * 
     */
    delete<T extends taxesDeleteArgs>(args: SelectSubset<T, taxesDeleteArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Taxes.
     * @param {taxesUpdateArgs} args - Arguments to update one Taxes.
     * @example
     * // Update one Taxes
     * const taxes = await prisma.taxes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends taxesUpdateArgs>(args: SelectSubset<T, taxesUpdateArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Taxes.
     * @param {taxesDeleteManyArgs} args - Arguments to filter Taxes to delete.
     * @example
     * // Delete a few Taxes
     * const { count } = await prisma.taxes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends taxesDeleteManyArgs>(args?: SelectSubset<T, taxesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Taxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taxesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Taxes
     * const taxes = await prisma.taxes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends taxesUpdateManyArgs>(args: SelectSubset<T, taxesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Taxes and returns the data updated in the database.
     * @param {taxesUpdateManyAndReturnArgs} args - Arguments to update many Taxes.
     * @example
     * // Update many Taxes
     * const taxes = await prisma.taxes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Taxes and only return the `id`
     * const taxesWithIdOnly = await prisma.taxes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends taxesUpdateManyAndReturnArgs>(args: SelectSubset<T, taxesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Taxes.
     * @param {taxesUpsertArgs} args - Arguments to update or create a Taxes.
     * @example
     * // Update or create a Taxes
     * const taxes = await prisma.taxes.upsert({
     *   create: {
     *     // ... data to create a Taxes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Taxes we want to update
     *   }
     * })
     */
    upsert<T extends taxesUpsertArgs>(args: SelectSubset<T, taxesUpsertArgs<ExtArgs>>): Prisma__taxesClient<$Result.GetResult<Prisma.$taxesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Taxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taxesCountArgs} args - Arguments to filter Taxes to count.
     * @example
     * // Count the number of Taxes
     * const count = await prisma.taxes.count({
     *   where: {
     *     // ... the filter for the Taxes we want to count
     *   }
     * })
    **/
    count<T extends taxesCountArgs>(
      args?: Subset<T, taxesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaxesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Taxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaxesAggregateArgs>(args: Subset<T, TaxesAggregateArgs>): Prisma.PrismaPromise<GetTaxesAggregateType<T>>

    /**
     * Group by Taxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taxesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends taxesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: taxesGroupByArgs['orderBy'] }
        : { orderBy?: taxesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, taxesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaxesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the taxes model
   */
  readonly fields: taxesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for taxes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__taxesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the taxes model
   */
  interface taxesFieldRefs {
    readonly id: FieldRef<"taxes", 'String'>
    readonly name: FieldRef<"taxes", 'String'>
    readonly percentage: FieldRef<"taxes", 'Float'>
    readonly source: FieldRef<"taxes", 'String'>
    readonly createdAt: FieldRef<"taxes", 'DateTime'>
    readonly updatedAt: FieldRef<"taxes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * taxes findUnique
   */
  export type taxesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * Filter, which taxes to fetch.
     */
    where: taxesWhereUniqueInput
  }

  /**
   * taxes findUniqueOrThrow
   */
  export type taxesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * Filter, which taxes to fetch.
     */
    where: taxesWhereUniqueInput
  }

  /**
   * taxes findFirst
   */
  export type taxesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * Filter, which taxes to fetch.
     */
    where?: taxesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of taxes to fetch.
     */
    orderBy?: taxesOrderByWithRelationInput | taxesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for taxes.
     */
    cursor?: taxesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` taxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` taxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of taxes.
     */
    distinct?: TaxesScalarFieldEnum | TaxesScalarFieldEnum[]
  }

  /**
   * taxes findFirstOrThrow
   */
  export type taxesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * Filter, which taxes to fetch.
     */
    where?: taxesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of taxes to fetch.
     */
    orderBy?: taxesOrderByWithRelationInput | taxesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for taxes.
     */
    cursor?: taxesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` taxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` taxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of taxes.
     */
    distinct?: TaxesScalarFieldEnum | TaxesScalarFieldEnum[]
  }

  /**
   * taxes findMany
   */
  export type taxesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * Filter, which taxes to fetch.
     */
    where?: taxesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of taxes to fetch.
     */
    orderBy?: taxesOrderByWithRelationInput | taxesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing taxes.
     */
    cursor?: taxesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` taxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` taxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of taxes.
     */
    distinct?: TaxesScalarFieldEnum | TaxesScalarFieldEnum[]
  }

  /**
   * taxes create
   */
  export type taxesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * The data needed to create a taxes.
     */
    data: XOR<taxesCreateInput, taxesUncheckedCreateInput>
  }

  /**
   * taxes createMany
   */
  export type taxesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many taxes.
     */
    data: taxesCreateManyInput | taxesCreateManyInput[]
  }

  /**
   * taxes createManyAndReturn
   */
  export type taxesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * The data used to create many taxes.
     */
    data: taxesCreateManyInput | taxesCreateManyInput[]
  }

  /**
   * taxes update
   */
  export type taxesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * The data needed to update a taxes.
     */
    data: XOR<taxesUpdateInput, taxesUncheckedUpdateInput>
    /**
     * Choose, which taxes to update.
     */
    where: taxesWhereUniqueInput
  }

  /**
   * taxes updateMany
   */
  export type taxesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update taxes.
     */
    data: XOR<taxesUpdateManyMutationInput, taxesUncheckedUpdateManyInput>
    /**
     * Filter which taxes to update
     */
    where?: taxesWhereInput
    /**
     * Limit how many taxes to update.
     */
    limit?: number
  }

  /**
   * taxes updateManyAndReturn
   */
  export type taxesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * The data used to update taxes.
     */
    data: XOR<taxesUpdateManyMutationInput, taxesUncheckedUpdateManyInput>
    /**
     * Filter which taxes to update
     */
    where?: taxesWhereInput
    /**
     * Limit how many taxes to update.
     */
    limit?: number
  }

  /**
   * taxes upsert
   */
  export type taxesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * The filter to search for the taxes to update in case it exists.
     */
    where: taxesWhereUniqueInput
    /**
     * In case the taxes found by the `where` argument doesn't exist, create a new taxes with this data.
     */
    create: XOR<taxesCreateInput, taxesUncheckedCreateInput>
    /**
     * In case the taxes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<taxesUpdateInput, taxesUncheckedUpdateInput>
  }

  /**
   * taxes delete
   */
  export type taxesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
    /**
     * Filter which taxes to delete.
     */
    where: taxesWhereUniqueInput
  }

  /**
   * taxes deleteMany
   */
  export type taxesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which taxes to delete
     */
    where?: taxesWhereInput
    /**
     * Limit how many taxes to delete.
     */
    limit?: number
  }

  /**
   * taxes without action
   */
  export type taxesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the taxes
     */
    select?: taxesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the taxes
     */
    omit?: taxesOmit<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    address: string | null
    account_key: string | null
    email: string | null
    firstname: string | null
    lastname: string | null
    password: string | null
    username: string | null
    phone: string | null
    phone2: string | null
    role: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    profile_image_url: string | null
    dashboard_config: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    address: string | null
    account_key: string | null
    email: string | null
    firstname: string | null
    lastname: string | null
    password: string | null
    username: string | null
    phone: string | null
    phone2: string | null
    role: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    profile_image_url: string | null
    dashboard_config: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    address: number
    account_key: number
    email: number
    firstname: number
    lastname: number
    password: number
    username: number
    phone: number
    phone2: number
    role: number
    createdby: number
    updatedby: number
    source: number
    profile_image_url: number
    dashboard_config: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    address?: true
    account_key?: true
    email?: true
    firstname?: true
    lastname?: true
    password?: true
    username?: true
    phone?: true
    phone2?: true
    role?: true
    createdby?: true
    updatedby?: true
    source?: true
    profile_image_url?: true
    dashboard_config?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    address?: true
    account_key?: true
    email?: true
    firstname?: true
    lastname?: true
    password?: true
    username?: true
    phone?: true
    phone2?: true
    role?: true
    createdby?: true
    updatedby?: true
    source?: true
    profile_image_url?: true
    dashboard_config?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    address?: true
    account_key?: true
    email?: true
    firstname?: true
    lastname?: true
    password?: true
    username?: true
    phone?: true
    phone2?: true
    role?: true
    createdby?: true
    updatedby?: true
    source?: true
    profile_image_url?: true
    dashboard_config?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    address: string | null
    account_key: string | null
    email: string | null
    firstname: string | null
    lastname: string | null
    password: string | null
    username: string | null
    phone: string | null
    phone2: string | null
    role: string | null
    createdby: string | null
    updatedby: string | null
    source: string | null
    profile_image_url: string | null
    dashboard_config: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    account_key?: boolean
    email?: boolean
    firstname?: boolean
    lastname?: boolean
    password?: boolean
    username?: boolean
    phone?: boolean
    phone2?: boolean
    role?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    profile_image_url?: boolean
    dashboard_config?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    account_key?: boolean
    email?: boolean
    firstname?: boolean
    lastname?: boolean
    password?: boolean
    username?: boolean
    phone?: boolean
    phone2?: boolean
    role?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    profile_image_url?: boolean
    dashboard_config?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    account_key?: boolean
    email?: boolean
    firstname?: boolean
    lastname?: boolean
    password?: boolean
    username?: boolean
    phone?: boolean
    phone2?: boolean
    role?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    profile_image_url?: boolean
    dashboard_config?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    address?: boolean
    account_key?: boolean
    email?: boolean
    firstname?: boolean
    lastname?: boolean
    password?: boolean
    username?: boolean
    phone?: boolean
    phone2?: boolean
    role?: boolean
    createdby?: boolean
    updatedby?: boolean
    source?: boolean
    profile_image_url?: boolean
    dashboard_config?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "account_key" | "email" | "firstname" | "lastname" | "password" | "username" | "phone" | "phone2" | "role" | "createdby" | "updatedby" | "source" | "profile_image_url" | "dashboard_config" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string | null
      account_key: string | null
      email: string | null
      firstname: string | null
      lastname: string | null
      password: string | null
      username: string | null
      phone: string | null
      phone2: string | null
      role: string | null
      createdby: string | null
      updatedby: string | null
      source: string | null
      profile_image_url: string | null
      dashboard_config: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly address: FieldRef<"user", 'String'>
    readonly account_key: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly firstname: FieldRef<"user", 'String'>
    readonly lastname: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly username: FieldRef<"user", 'String'>
    readonly phone: FieldRef<"user", 'String'>
    readonly phone2: FieldRef<"user", 'String'>
    readonly role: FieldRef<"user", 'String'>
    readonly createdby: FieldRef<"user", 'String'>
    readonly updatedby: FieldRef<"user", 'String'>
    readonly source: FieldRef<"user", 'String'>
    readonly profile_image_url: FieldRef<"user", 'String'>
    readonly dashboard_config: FieldRef<"user", 'String'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SequelizeMetaScalarFieldEnum: {
    name: 'name'
  };

  export type SequelizeMetaScalarFieldEnum = (typeof SequelizeMetaScalarFieldEnum)[keyof typeof SequelizeMetaScalarFieldEnum]


  export const BrandScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    createdby: 'createdby',
    updatedby: 'updatedby',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const CashclosingScalarFieldEnum: {
    id: 'id',
    closingbalance: 'closingbalance',
    date: 'date',
    expence: 'expence',
    note: 'note',
    sale: 'sale',
    fk_user_in_cashclosing: 'fk_user_in_cashclosing',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CashclosingScalarFieldEnum = (typeof CashclosingScalarFieldEnum)[keyof typeof CashclosingScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    createdby: 'createdby',
    updatedby: 'updatedby',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const FinanceaccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    fk_parent_in_financeaccount: 'fk_parent_in_financeaccount',
    createdby: 'createdby',
    updatedby: 'updatedby',
    source: 'source',
    value: 'value',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FinanceaccountScalarFieldEnum = (typeof FinanceaccountScalarFieldEnum)[keyof typeof FinanceaccountScalarFieldEnum]


  export const FinancetransactionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    status: 'status',
    date: 'date',
    details: 'details',
    source: 'source',
    fk_user_targetto_in_financetransaction: 'fk_user_targetto_in_financetransaction',
    fk_financeaccount_in_financetransaction: 'fk_financeaccount_in_financetransaction',
    createdby: 'createdby',
    updatedby: 'updatedby',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FinancetransactionScalarFieldEnum = (typeof FinancetransactionScalarFieldEnum)[keyof typeof FinancetransactionScalarFieldEnum]


  export const InventorylogsScalarFieldEnum: {
    id: 'id',
    product_id: 'product_id',
    quantity: 'quantity',
    note: 'note',
    createdby: 'createdby',
    type: 'type',
    vendor: 'vendor',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InventorylogsScalarFieldEnum = (typeof InventorylogsScalarFieldEnum)[keyof typeof InventorylogsScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    barcode: 'barcode',
    brand: 'brand',
    carrycost: 'carrycost',
    category: 'category',
    discount: 'discount',
    ispurchaseable: 'ispurchaseable',
    issaleable: 'issaleable',
    name: 'name',
    purchaseactive: 'purchaseactive',
    purchaseprice: 'purchaseprice',
    quantity: 'quantity',
    saleactive: 'saleactive',
    saleprice: 'saleprice',
    taxid: 'taxid',
    createdby: 'createdby',
    updatedby: 'updatedby',
    source: 'source'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductbatchesScalarFieldEnum: {
    id: 'id',
    product: 'product',
    expirydate: 'expirydate',
    quantity: 'quantity',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductbatchesScalarFieldEnum = (typeof ProductbatchesScalarFieldEnum)[keyof typeof ProductbatchesScalarFieldEnum]


  export const ProductsalepurchaseScalarFieldEnum: {
    id: 'id',
    price: 'price',
    quantity: 'quantity',
    total: 'total',
    fk_product_in_productsalepurchase: 'fk_product_in_productsalepurchase',
    fk_financetransaction_in_productsalepurchase: 'fk_financetransaction_in_productsalepurchase',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductsalepurchaseScalarFieldEnum = (typeof ProductsalepurchaseScalarFieldEnum)[keyof typeof ProductsalepurchaseScalarFieldEnum]


  export const ProductsubScalarFieldEnum: {
    id: 'id',
    fk_product_main_in_productsub: 'fk_product_main_in_productsub',
    fk_product_sub_in_productsub: 'fk_product_sub_in_productsub',
    quantity: 'quantity',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductsubScalarFieldEnum = (typeof ProductsubScalarFieldEnum)[keyof typeof ProductsubScalarFieldEnum]


  export const PurchaseScalarFieldEnum: {
    id: 'id',
    createdby: 'createdby',
    updatedby: 'updatedby',
    vendor: 'vendor',
    totalAmount: 'totalAmount',
    totalPayment: 'totalPayment',
    invoicenum: 'invoicenum',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum]


  export const PurchasedproductsScalarFieldEnum: {
    id: 'id',
    purchase: 'purchase',
    product: 'product',
    quantity: 'quantity',
    totalAmount: 'totalAmount',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PurchasedproductsScalarFieldEnum = (typeof PurchasedproductsScalarFieldEnum)[keyof typeof PurchasedproductsScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    user: 'user',
    customer: 'customer',
    invoicenum: 'invoicenum',
    discountpercentage: 'discountpercentage',
    totalprice: 'totalprice',
    totalpayment: 'totalpayment',
    createdby: 'createdby',
    updatedby: 'updatedby',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const SoftwaresettingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    source: 'source'
  };

  export type SoftwaresettingScalarFieldEnum = (typeof SoftwaresettingScalarFieldEnum)[keyof typeof SoftwaresettingScalarFieldEnum]


  export const SoldproductsScalarFieldEnum: {
    id: 'id',
    sale: 'sale',
    product: 'product',
    quantity: 'quantity',
    price: 'price',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SoldproductsScalarFieldEnum = (typeof SoldproductsScalarFieldEnum)[keyof typeof SoldproductsScalarFieldEnum]


  export const TaxesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    percentage: 'percentage',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaxesScalarFieldEnum = (typeof TaxesScalarFieldEnum)[keyof typeof TaxesScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    address: 'address',
    account_key: 'account_key',
    email: 'email',
    firstname: 'firstname',
    lastname: 'lastname',
    password: 'password',
    username: 'username',
    phone: 'phone',
    phone2: 'phone2',
    role: 'role',
    createdby: 'createdby',
    updatedby: 'updatedby',
    source: 'source',
    profile_image_url: 'profile_image_url',
    dashboard_config: 'dashboard_config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type SequelizeMetaWhereInput = {
    AND?: SequelizeMetaWhereInput | SequelizeMetaWhereInput[]
    OR?: SequelizeMetaWhereInput[]
    NOT?: SequelizeMetaWhereInput | SequelizeMetaWhereInput[]
    name?: StringFilter<"SequelizeMeta"> | string
  }

  export type SequelizeMetaOrderByWithRelationInput = {
    name?: SortOrder
  }

  export type SequelizeMetaWhereUniqueInput = Prisma.AtLeast<{
    name?: string
    AND?: SequelizeMetaWhereInput | SequelizeMetaWhereInput[]
    OR?: SequelizeMetaWhereInput[]
    NOT?: SequelizeMetaWhereInput | SequelizeMetaWhereInput[]
  }, "name">

  export type SequelizeMetaOrderByWithAggregationInput = {
    name?: SortOrder
    _count?: SequelizeMetaCountOrderByAggregateInput
    _max?: SequelizeMetaMaxOrderByAggregateInput
    _min?: SequelizeMetaMinOrderByAggregateInput
  }

  export type SequelizeMetaScalarWhereWithAggregatesInput = {
    AND?: SequelizeMetaScalarWhereWithAggregatesInput | SequelizeMetaScalarWhereWithAggregatesInput[]
    OR?: SequelizeMetaScalarWhereWithAggregatesInput[]
    NOT?: SequelizeMetaScalarWhereWithAggregatesInput | SequelizeMetaScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"SequelizeMeta"> | string
  }

  export type brandWhereInput = {
    AND?: brandWhereInput | brandWhereInput[]
    OR?: brandWhereInput[]
    NOT?: brandWhereInput | brandWhereInput[]
    id?: StringFilter<"brand"> | string
    name?: StringFilter<"brand"> | string
    description?: StringNullableFilter<"brand"> | string | null
    status?: BoolNullableFilter<"brand"> | boolean | null
    createdby?: StringNullableFilter<"brand"> | string | null
    updatedby?: StringNullableFilter<"brand"> | string | null
    source?: StringNullableFilter<"brand"> | string | null
    createdAt?: DateTimeFilter<"brand"> | Date | string
    updatedAt?: DateTimeFilter<"brand"> | Date | string
  }

  export type brandOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type brandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: brandWhereInput | brandWhereInput[]
    OR?: brandWhereInput[]
    NOT?: brandWhereInput | brandWhereInput[]
    name?: StringFilter<"brand"> | string
    description?: StringNullableFilter<"brand"> | string | null
    status?: BoolNullableFilter<"brand"> | boolean | null
    createdby?: StringNullableFilter<"brand"> | string | null
    updatedby?: StringNullableFilter<"brand"> | string | null
    source?: StringNullableFilter<"brand"> | string | null
    createdAt?: DateTimeFilter<"brand"> | Date | string
    updatedAt?: DateTimeFilter<"brand"> | Date | string
  }, "id">

  export type brandOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: brandCountOrderByAggregateInput
    _max?: brandMaxOrderByAggregateInput
    _min?: brandMinOrderByAggregateInput
  }

  export type brandScalarWhereWithAggregatesInput = {
    AND?: brandScalarWhereWithAggregatesInput | brandScalarWhereWithAggregatesInput[]
    OR?: brandScalarWhereWithAggregatesInput[]
    NOT?: brandScalarWhereWithAggregatesInput | brandScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"brand"> | string
    name?: StringWithAggregatesFilter<"brand"> | string
    description?: StringNullableWithAggregatesFilter<"brand"> | string | null
    status?: BoolNullableWithAggregatesFilter<"brand"> | boolean | null
    createdby?: StringNullableWithAggregatesFilter<"brand"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"brand"> | string | null
    source?: StringNullableWithAggregatesFilter<"brand"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"brand"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"brand"> | Date | string
  }

  export type cashclosingWhereInput = {
    AND?: cashclosingWhereInput | cashclosingWhereInput[]
    OR?: cashclosingWhereInput[]
    NOT?: cashclosingWhereInput | cashclosingWhereInput[]
    id?: StringFilter<"cashclosing"> | string
    closingbalance?: FloatNullableFilter<"cashclosing"> | number | null
    date?: DateTimeNullableFilter<"cashclosing"> | Date | string | null
    expence?: FloatNullableFilter<"cashclosing"> | number | null
    note?: StringNullableFilter<"cashclosing"> | string | null
    sale?: FloatNullableFilter<"cashclosing"> | number | null
    fk_user_in_cashclosing?: StringNullableFilter<"cashclosing"> | string | null
    source?: StringNullableFilter<"cashclosing"> | string | null
    createdAt?: DateTimeFilter<"cashclosing"> | Date | string
    updatedAt?: DateTimeFilter<"cashclosing"> | Date | string
  }

  export type cashclosingOrderByWithRelationInput = {
    id?: SortOrder
    closingbalance?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    expence?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    sale?: SortOrderInput | SortOrder
    fk_user_in_cashclosing?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type cashclosingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: cashclosingWhereInput | cashclosingWhereInput[]
    OR?: cashclosingWhereInput[]
    NOT?: cashclosingWhereInput | cashclosingWhereInput[]
    closingbalance?: FloatNullableFilter<"cashclosing"> | number | null
    date?: DateTimeNullableFilter<"cashclosing"> | Date | string | null
    expence?: FloatNullableFilter<"cashclosing"> | number | null
    note?: StringNullableFilter<"cashclosing"> | string | null
    sale?: FloatNullableFilter<"cashclosing"> | number | null
    fk_user_in_cashclosing?: StringNullableFilter<"cashclosing"> | string | null
    source?: StringNullableFilter<"cashclosing"> | string | null
    createdAt?: DateTimeFilter<"cashclosing"> | Date | string
    updatedAt?: DateTimeFilter<"cashclosing"> | Date | string
  }, "id">

  export type cashclosingOrderByWithAggregationInput = {
    id?: SortOrder
    closingbalance?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    expence?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    sale?: SortOrderInput | SortOrder
    fk_user_in_cashclosing?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: cashclosingCountOrderByAggregateInput
    _avg?: cashclosingAvgOrderByAggregateInput
    _max?: cashclosingMaxOrderByAggregateInput
    _min?: cashclosingMinOrderByAggregateInput
    _sum?: cashclosingSumOrderByAggregateInput
  }

  export type cashclosingScalarWhereWithAggregatesInput = {
    AND?: cashclosingScalarWhereWithAggregatesInput | cashclosingScalarWhereWithAggregatesInput[]
    OR?: cashclosingScalarWhereWithAggregatesInput[]
    NOT?: cashclosingScalarWhereWithAggregatesInput | cashclosingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"cashclosing"> | string
    closingbalance?: FloatNullableWithAggregatesFilter<"cashclosing"> | number | null
    date?: DateTimeNullableWithAggregatesFilter<"cashclosing"> | Date | string | null
    expence?: FloatNullableWithAggregatesFilter<"cashclosing"> | number | null
    note?: StringNullableWithAggregatesFilter<"cashclosing"> | string | null
    sale?: FloatNullableWithAggregatesFilter<"cashclosing"> | number | null
    fk_user_in_cashclosing?: StringNullableWithAggregatesFilter<"cashclosing"> | string | null
    source?: StringNullableWithAggregatesFilter<"cashclosing"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"cashclosing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"cashclosing"> | Date | string
  }

  export type categoryWhereInput = {
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    id?: StringFilter<"category"> | string
    name?: StringFilter<"category"> | string
    description?: StringNullableFilter<"category"> | string | null
    status?: BoolNullableFilter<"category"> | boolean | null
    createdby?: StringNullableFilter<"category"> | string | null
    updatedby?: StringNullableFilter<"category"> | string | null
    source?: StringNullableFilter<"category"> | string | null
    createdAt?: DateTimeFilter<"category"> | Date | string
    updatedAt?: DateTimeFilter<"category"> | Date | string
  }

  export type categoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type categoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    name?: StringFilter<"category"> | string
    description?: StringNullableFilter<"category"> | string | null
    status?: BoolNullableFilter<"category"> | boolean | null
    createdby?: StringNullableFilter<"category"> | string | null
    updatedby?: StringNullableFilter<"category"> | string | null
    source?: StringNullableFilter<"category"> | string | null
    createdAt?: DateTimeFilter<"category"> | Date | string
    updatedAt?: DateTimeFilter<"category"> | Date | string
  }, "id">

  export type categoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: categoryCountOrderByAggregateInput
    _max?: categoryMaxOrderByAggregateInput
    _min?: categoryMinOrderByAggregateInput
  }

  export type categoryScalarWhereWithAggregatesInput = {
    AND?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    OR?: categoryScalarWhereWithAggregatesInput[]
    NOT?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"category"> | string
    name?: StringWithAggregatesFilter<"category"> | string
    description?: StringNullableWithAggregatesFilter<"category"> | string | null
    status?: BoolNullableWithAggregatesFilter<"category"> | boolean | null
    createdby?: StringNullableWithAggregatesFilter<"category"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"category"> | string | null
    source?: StringNullableWithAggregatesFilter<"category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"category"> | Date | string
  }

  export type financeaccountWhereInput = {
    AND?: financeaccountWhereInput | financeaccountWhereInput[]
    OR?: financeaccountWhereInput[]
    NOT?: financeaccountWhereInput | financeaccountWhereInput[]
    id?: StringFilter<"financeaccount"> | string
    name?: StringNullableFilter<"financeaccount"> | string | null
    type?: StringNullableFilter<"financeaccount"> | string | null
    fk_parent_in_financeaccount?: StringNullableFilter<"financeaccount"> | string | null
    createdby?: StringNullableFilter<"financeaccount"> | string | null
    updatedby?: StringNullableFilter<"financeaccount"> | string | null
    source?: StringNullableFilter<"financeaccount"> | string | null
    value?: DecimalNullableFilter<"financeaccount"> | Decimal | DecimalJsLike | number | string | null
    isDefault?: BoolNullableFilter<"financeaccount"> | boolean | null
    createdAt?: DateTimeFilter<"financeaccount"> | Date | string
    updatedAt?: DateTimeFilter<"financeaccount"> | Date | string
  }

  export type financeaccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    fk_parent_in_financeaccount?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    isDefault?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financeaccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: financeaccountWhereInput | financeaccountWhereInput[]
    OR?: financeaccountWhereInput[]
    NOT?: financeaccountWhereInput | financeaccountWhereInput[]
    name?: StringNullableFilter<"financeaccount"> | string | null
    type?: StringNullableFilter<"financeaccount"> | string | null
    fk_parent_in_financeaccount?: StringNullableFilter<"financeaccount"> | string | null
    createdby?: StringNullableFilter<"financeaccount"> | string | null
    updatedby?: StringNullableFilter<"financeaccount"> | string | null
    source?: StringNullableFilter<"financeaccount"> | string | null
    value?: DecimalNullableFilter<"financeaccount"> | Decimal | DecimalJsLike | number | string | null
    isDefault?: BoolNullableFilter<"financeaccount"> | boolean | null
    createdAt?: DateTimeFilter<"financeaccount"> | Date | string
    updatedAt?: DateTimeFilter<"financeaccount"> | Date | string
  }, "id">

  export type financeaccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    fk_parent_in_financeaccount?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    isDefault?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: financeaccountCountOrderByAggregateInput
    _avg?: financeaccountAvgOrderByAggregateInput
    _max?: financeaccountMaxOrderByAggregateInput
    _min?: financeaccountMinOrderByAggregateInput
    _sum?: financeaccountSumOrderByAggregateInput
  }

  export type financeaccountScalarWhereWithAggregatesInput = {
    AND?: financeaccountScalarWhereWithAggregatesInput | financeaccountScalarWhereWithAggregatesInput[]
    OR?: financeaccountScalarWhereWithAggregatesInput[]
    NOT?: financeaccountScalarWhereWithAggregatesInput | financeaccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"financeaccount"> | string
    name?: StringNullableWithAggregatesFilter<"financeaccount"> | string | null
    type?: StringNullableWithAggregatesFilter<"financeaccount"> | string | null
    fk_parent_in_financeaccount?: StringNullableWithAggregatesFilter<"financeaccount"> | string | null
    createdby?: StringNullableWithAggregatesFilter<"financeaccount"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"financeaccount"> | string | null
    source?: StringNullableWithAggregatesFilter<"financeaccount"> | string | null
    value?: DecimalNullableWithAggregatesFilter<"financeaccount"> | Decimal | DecimalJsLike | number | string | null
    isDefault?: BoolNullableWithAggregatesFilter<"financeaccount"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"financeaccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"financeaccount"> | Date | string
  }

  export type financetransactionWhereInput = {
    AND?: financetransactionWhereInput | financetransactionWhereInput[]
    OR?: financetransactionWhereInput[]
    NOT?: financetransactionWhereInput | financetransactionWhereInput[]
    id?: StringFilter<"financetransaction"> | string
    name?: StringNullableFilter<"financetransaction"> | string | null
    amount?: FloatNullableFilter<"financetransaction"> | number | null
    status?: StringNullableFilter<"financetransaction"> | string | null
    date?: DateTimeNullableFilter<"financetransaction"> | Date | string | null
    details?: StringNullableFilter<"financetransaction"> | string | null
    source?: StringNullableFilter<"financetransaction"> | string | null
    fk_user_targetto_in_financetransaction?: StringNullableFilter<"financetransaction"> | string | null
    fk_financeaccount_in_financetransaction?: StringNullableFilter<"financetransaction"> | string | null
    createdby?: StringNullableFilter<"financetransaction"> | string | null
    updatedby?: StringNullableFilter<"financetransaction"> | string | null
    createdAt?: DateTimeFilter<"financetransaction"> | Date | string
    updatedAt?: DateTimeFilter<"financetransaction"> | Date | string
  }

  export type financetransactionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    fk_user_targetto_in_financetransaction?: SortOrderInput | SortOrder
    fk_financeaccount_in_financetransaction?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financetransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: financetransactionWhereInput | financetransactionWhereInput[]
    OR?: financetransactionWhereInput[]
    NOT?: financetransactionWhereInput | financetransactionWhereInput[]
    name?: StringNullableFilter<"financetransaction"> | string | null
    amount?: FloatNullableFilter<"financetransaction"> | number | null
    status?: StringNullableFilter<"financetransaction"> | string | null
    date?: DateTimeNullableFilter<"financetransaction"> | Date | string | null
    details?: StringNullableFilter<"financetransaction"> | string | null
    source?: StringNullableFilter<"financetransaction"> | string | null
    fk_user_targetto_in_financetransaction?: StringNullableFilter<"financetransaction"> | string | null
    fk_financeaccount_in_financetransaction?: StringNullableFilter<"financetransaction"> | string | null
    createdby?: StringNullableFilter<"financetransaction"> | string | null
    updatedby?: StringNullableFilter<"financetransaction"> | string | null
    createdAt?: DateTimeFilter<"financetransaction"> | Date | string
    updatedAt?: DateTimeFilter<"financetransaction"> | Date | string
  }, "id">

  export type financetransactionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    fk_user_targetto_in_financetransaction?: SortOrderInput | SortOrder
    fk_financeaccount_in_financetransaction?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: financetransactionCountOrderByAggregateInput
    _avg?: financetransactionAvgOrderByAggregateInput
    _max?: financetransactionMaxOrderByAggregateInput
    _min?: financetransactionMinOrderByAggregateInput
    _sum?: financetransactionSumOrderByAggregateInput
  }

  export type financetransactionScalarWhereWithAggregatesInput = {
    AND?: financetransactionScalarWhereWithAggregatesInput | financetransactionScalarWhereWithAggregatesInput[]
    OR?: financetransactionScalarWhereWithAggregatesInput[]
    NOT?: financetransactionScalarWhereWithAggregatesInput | financetransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"financetransaction"> | string
    name?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    amount?: FloatNullableWithAggregatesFilter<"financetransaction"> | number | null
    status?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    date?: DateTimeNullableWithAggregatesFilter<"financetransaction"> | Date | string | null
    details?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    source?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    fk_user_targetto_in_financetransaction?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    fk_financeaccount_in_financetransaction?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    createdby?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"financetransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"financetransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"financetransaction"> | Date | string
  }

  export type inventorylogsWhereInput = {
    AND?: inventorylogsWhereInput | inventorylogsWhereInput[]
    OR?: inventorylogsWhereInput[]
    NOT?: inventorylogsWhereInput | inventorylogsWhereInput[]
    id?: StringFilter<"inventorylogs"> | string
    product_id?: StringFilter<"inventorylogs"> | string
    quantity?: IntFilter<"inventorylogs"> | number
    note?: StringNullableFilter<"inventorylogs"> | string | null
    createdby?: StringFilter<"inventorylogs"> | string
    type?: StringFilter<"inventorylogs"> | string
    vendor?: StringNullableFilter<"inventorylogs"> | string | null
    source?: StringNullableFilter<"inventorylogs"> | string | null
    createdAt?: DateTimeFilter<"inventorylogs"> | Date | string
    updatedAt?: DateTimeFilter<"inventorylogs"> | Date | string
  }

  export type inventorylogsOrderByWithRelationInput = {
    id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    createdby?: SortOrder
    type?: SortOrder
    vendor?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type inventorylogsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: inventorylogsWhereInput | inventorylogsWhereInput[]
    OR?: inventorylogsWhereInput[]
    NOT?: inventorylogsWhereInput | inventorylogsWhereInput[]
    product_id?: StringFilter<"inventorylogs"> | string
    quantity?: IntFilter<"inventorylogs"> | number
    note?: StringNullableFilter<"inventorylogs"> | string | null
    createdby?: StringFilter<"inventorylogs"> | string
    type?: StringFilter<"inventorylogs"> | string
    vendor?: StringNullableFilter<"inventorylogs"> | string | null
    source?: StringNullableFilter<"inventorylogs"> | string | null
    createdAt?: DateTimeFilter<"inventorylogs"> | Date | string
    updatedAt?: DateTimeFilter<"inventorylogs"> | Date | string
  }, "id">

  export type inventorylogsOrderByWithAggregationInput = {
    id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    createdby?: SortOrder
    type?: SortOrder
    vendor?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: inventorylogsCountOrderByAggregateInput
    _avg?: inventorylogsAvgOrderByAggregateInput
    _max?: inventorylogsMaxOrderByAggregateInput
    _min?: inventorylogsMinOrderByAggregateInput
    _sum?: inventorylogsSumOrderByAggregateInput
  }

  export type inventorylogsScalarWhereWithAggregatesInput = {
    AND?: inventorylogsScalarWhereWithAggregatesInput | inventorylogsScalarWhereWithAggregatesInput[]
    OR?: inventorylogsScalarWhereWithAggregatesInput[]
    NOT?: inventorylogsScalarWhereWithAggregatesInput | inventorylogsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"inventorylogs"> | string
    product_id?: StringWithAggregatesFilter<"inventorylogs"> | string
    quantity?: IntWithAggregatesFilter<"inventorylogs"> | number
    note?: StringNullableWithAggregatesFilter<"inventorylogs"> | string | null
    createdby?: StringWithAggregatesFilter<"inventorylogs"> | string
    type?: StringWithAggregatesFilter<"inventorylogs"> | string
    vendor?: StringNullableWithAggregatesFilter<"inventorylogs"> | string | null
    source?: StringNullableWithAggregatesFilter<"inventorylogs"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"inventorylogs"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"inventorylogs"> | Date | string
  }

  export type productWhereInput = {
    AND?: productWhereInput | productWhereInput[]
    OR?: productWhereInput[]
    NOT?: productWhereInput | productWhereInput[]
    id?: StringFilter<"product"> | string
    barcode?: StringNullableFilter<"product"> | string | null
    brand?: StringNullableFilter<"product"> | string | null
    carrycost?: FloatNullableFilter<"product"> | number | null
    category?: StringNullableFilter<"product"> | string | null
    discount?: FloatNullableFilter<"product"> | number | null
    ispurchaseable?: BoolNullableFilter<"product"> | boolean | null
    issaleable?: BoolNullableFilter<"product"> | boolean | null
    name?: StringNullableFilter<"product"> | string | null
    purchaseactive?: BoolNullableFilter<"product"> | boolean | null
    purchaseprice?: FloatNullableFilter<"product"> | number | null
    quantity?: FloatNullableFilter<"product"> | number | null
    saleactive?: BoolNullableFilter<"product"> | boolean | null
    saleprice?: FloatNullableFilter<"product"> | number | null
    taxid?: StringNullableFilter<"product"> | string | null
    createdby?: StringNullableFilter<"product"> | string | null
    updatedby?: StringNullableFilter<"product"> | string | null
    source?: StringNullableFilter<"product"> | string | null
  }

  export type productOrderByWithRelationInput = {
    id?: SortOrder
    barcode?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    carrycost?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    ispurchaseable?: SortOrderInput | SortOrder
    issaleable?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    purchaseactive?: SortOrderInput | SortOrder
    purchaseprice?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    saleactive?: SortOrderInput | SortOrder
    saleprice?: SortOrderInput | SortOrder
    taxid?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
  }

  export type productWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: productWhereInput | productWhereInput[]
    OR?: productWhereInput[]
    NOT?: productWhereInput | productWhereInput[]
    barcode?: StringNullableFilter<"product"> | string | null
    brand?: StringNullableFilter<"product"> | string | null
    carrycost?: FloatNullableFilter<"product"> | number | null
    category?: StringNullableFilter<"product"> | string | null
    discount?: FloatNullableFilter<"product"> | number | null
    ispurchaseable?: BoolNullableFilter<"product"> | boolean | null
    issaleable?: BoolNullableFilter<"product"> | boolean | null
    name?: StringNullableFilter<"product"> | string | null
    purchaseactive?: BoolNullableFilter<"product"> | boolean | null
    purchaseprice?: FloatNullableFilter<"product"> | number | null
    quantity?: FloatNullableFilter<"product"> | number | null
    saleactive?: BoolNullableFilter<"product"> | boolean | null
    saleprice?: FloatNullableFilter<"product"> | number | null
    taxid?: StringNullableFilter<"product"> | string | null
    createdby?: StringNullableFilter<"product"> | string | null
    updatedby?: StringNullableFilter<"product"> | string | null
    source?: StringNullableFilter<"product"> | string | null
  }, "id">

  export type productOrderByWithAggregationInput = {
    id?: SortOrder
    barcode?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    carrycost?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    ispurchaseable?: SortOrderInput | SortOrder
    issaleable?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    purchaseactive?: SortOrderInput | SortOrder
    purchaseprice?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    saleactive?: SortOrderInput | SortOrder
    saleprice?: SortOrderInput | SortOrder
    taxid?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    _count?: productCountOrderByAggregateInput
    _avg?: productAvgOrderByAggregateInput
    _max?: productMaxOrderByAggregateInput
    _min?: productMinOrderByAggregateInput
    _sum?: productSumOrderByAggregateInput
  }

  export type productScalarWhereWithAggregatesInput = {
    AND?: productScalarWhereWithAggregatesInput | productScalarWhereWithAggregatesInput[]
    OR?: productScalarWhereWithAggregatesInput[]
    NOT?: productScalarWhereWithAggregatesInput | productScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"product"> | string
    barcode?: StringNullableWithAggregatesFilter<"product"> | string | null
    brand?: StringNullableWithAggregatesFilter<"product"> | string | null
    carrycost?: FloatNullableWithAggregatesFilter<"product"> | number | null
    category?: StringNullableWithAggregatesFilter<"product"> | string | null
    discount?: FloatNullableWithAggregatesFilter<"product"> | number | null
    ispurchaseable?: BoolNullableWithAggregatesFilter<"product"> | boolean | null
    issaleable?: BoolNullableWithAggregatesFilter<"product"> | boolean | null
    name?: StringNullableWithAggregatesFilter<"product"> | string | null
    purchaseactive?: BoolNullableWithAggregatesFilter<"product"> | boolean | null
    purchaseprice?: FloatNullableWithAggregatesFilter<"product"> | number | null
    quantity?: FloatNullableWithAggregatesFilter<"product"> | number | null
    saleactive?: BoolNullableWithAggregatesFilter<"product"> | boolean | null
    saleprice?: FloatNullableWithAggregatesFilter<"product"> | number | null
    taxid?: StringNullableWithAggregatesFilter<"product"> | string | null
    createdby?: StringNullableWithAggregatesFilter<"product"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"product"> | string | null
    source?: StringNullableWithAggregatesFilter<"product"> | string | null
  }

  export type productbatchesWhereInput = {
    AND?: productbatchesWhereInput | productbatchesWhereInput[]
    OR?: productbatchesWhereInput[]
    NOT?: productbatchesWhereInput | productbatchesWhereInput[]
    id?: StringFilter<"productbatches"> | string
    product?: StringNullableFilter<"productbatches"> | string | null
    expirydate?: DateTimeNullableFilter<"productbatches"> | Date | string | null
    quantity?: FloatNullableFilter<"productbatches"> | number | null
    source?: StringNullableFilter<"productbatches"> | string | null
    createdAt?: DateTimeFilter<"productbatches"> | Date | string
    updatedAt?: DateTimeFilter<"productbatches"> | Date | string
  }

  export type productbatchesOrderByWithRelationInput = {
    id?: SortOrder
    product?: SortOrderInput | SortOrder
    expirydate?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productbatchesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: productbatchesWhereInput | productbatchesWhereInput[]
    OR?: productbatchesWhereInput[]
    NOT?: productbatchesWhereInput | productbatchesWhereInput[]
    product?: StringNullableFilter<"productbatches"> | string | null
    expirydate?: DateTimeNullableFilter<"productbatches"> | Date | string | null
    quantity?: FloatNullableFilter<"productbatches"> | number | null
    source?: StringNullableFilter<"productbatches"> | string | null
    createdAt?: DateTimeFilter<"productbatches"> | Date | string
    updatedAt?: DateTimeFilter<"productbatches"> | Date | string
  }, "id">

  export type productbatchesOrderByWithAggregationInput = {
    id?: SortOrder
    product?: SortOrderInput | SortOrder
    expirydate?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: productbatchesCountOrderByAggregateInput
    _avg?: productbatchesAvgOrderByAggregateInput
    _max?: productbatchesMaxOrderByAggregateInput
    _min?: productbatchesMinOrderByAggregateInput
    _sum?: productbatchesSumOrderByAggregateInput
  }

  export type productbatchesScalarWhereWithAggregatesInput = {
    AND?: productbatchesScalarWhereWithAggregatesInput | productbatchesScalarWhereWithAggregatesInput[]
    OR?: productbatchesScalarWhereWithAggregatesInput[]
    NOT?: productbatchesScalarWhereWithAggregatesInput | productbatchesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"productbatches"> | string
    product?: StringNullableWithAggregatesFilter<"productbatches"> | string | null
    expirydate?: DateTimeNullableWithAggregatesFilter<"productbatches"> | Date | string | null
    quantity?: FloatNullableWithAggregatesFilter<"productbatches"> | number | null
    source?: StringNullableWithAggregatesFilter<"productbatches"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"productbatches"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"productbatches"> | Date | string
  }

  export type productsalepurchaseWhereInput = {
    AND?: productsalepurchaseWhereInput | productsalepurchaseWhereInput[]
    OR?: productsalepurchaseWhereInput[]
    NOT?: productsalepurchaseWhereInput | productsalepurchaseWhereInput[]
    id?: StringFilter<"productsalepurchase"> | string
    price?: FloatNullableFilter<"productsalepurchase"> | number | null
    quantity?: FloatNullableFilter<"productsalepurchase"> | number | null
    total?: FloatNullableFilter<"productsalepurchase"> | number | null
    fk_product_in_productsalepurchase?: StringNullableFilter<"productsalepurchase"> | string | null
    fk_financetransaction_in_productsalepurchase?: StringNullableFilter<"productsalepurchase"> | string | null
    source?: StringNullableFilter<"productsalepurchase"> | string | null
    createdAt?: DateTimeFilter<"productsalepurchase"> | Date | string
    updatedAt?: DateTimeFilter<"productsalepurchase"> | Date | string
  }

  export type productsalepurchaseOrderByWithRelationInput = {
    id?: SortOrder
    price?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    total?: SortOrderInput | SortOrder
    fk_product_in_productsalepurchase?: SortOrderInput | SortOrder
    fk_financetransaction_in_productsalepurchase?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsalepurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: productsalepurchaseWhereInput | productsalepurchaseWhereInput[]
    OR?: productsalepurchaseWhereInput[]
    NOT?: productsalepurchaseWhereInput | productsalepurchaseWhereInput[]
    price?: FloatNullableFilter<"productsalepurchase"> | number | null
    quantity?: FloatNullableFilter<"productsalepurchase"> | number | null
    total?: FloatNullableFilter<"productsalepurchase"> | number | null
    fk_product_in_productsalepurchase?: StringNullableFilter<"productsalepurchase"> | string | null
    fk_financetransaction_in_productsalepurchase?: StringNullableFilter<"productsalepurchase"> | string | null
    source?: StringNullableFilter<"productsalepurchase"> | string | null
    createdAt?: DateTimeFilter<"productsalepurchase"> | Date | string
    updatedAt?: DateTimeFilter<"productsalepurchase"> | Date | string
  }, "id">

  export type productsalepurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    price?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    total?: SortOrderInput | SortOrder
    fk_product_in_productsalepurchase?: SortOrderInput | SortOrder
    fk_financetransaction_in_productsalepurchase?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: productsalepurchaseCountOrderByAggregateInput
    _avg?: productsalepurchaseAvgOrderByAggregateInput
    _max?: productsalepurchaseMaxOrderByAggregateInput
    _min?: productsalepurchaseMinOrderByAggregateInput
    _sum?: productsalepurchaseSumOrderByAggregateInput
  }

  export type productsalepurchaseScalarWhereWithAggregatesInput = {
    AND?: productsalepurchaseScalarWhereWithAggregatesInput | productsalepurchaseScalarWhereWithAggregatesInput[]
    OR?: productsalepurchaseScalarWhereWithAggregatesInput[]
    NOT?: productsalepurchaseScalarWhereWithAggregatesInput | productsalepurchaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"productsalepurchase"> | string
    price?: FloatNullableWithAggregatesFilter<"productsalepurchase"> | number | null
    quantity?: FloatNullableWithAggregatesFilter<"productsalepurchase"> | number | null
    total?: FloatNullableWithAggregatesFilter<"productsalepurchase"> | number | null
    fk_product_in_productsalepurchase?: StringNullableWithAggregatesFilter<"productsalepurchase"> | string | null
    fk_financetransaction_in_productsalepurchase?: StringNullableWithAggregatesFilter<"productsalepurchase"> | string | null
    source?: StringNullableWithAggregatesFilter<"productsalepurchase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"productsalepurchase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"productsalepurchase"> | Date | string
  }

  export type productsubWhereInput = {
    AND?: productsubWhereInput | productsubWhereInput[]
    OR?: productsubWhereInput[]
    NOT?: productsubWhereInput | productsubWhereInput[]
    id?: StringFilter<"productsub"> | string
    fk_product_main_in_productsub?: StringNullableFilter<"productsub"> | string | null
    fk_product_sub_in_productsub?: StringNullableFilter<"productsub"> | string | null
    quantity?: FloatNullableFilter<"productsub"> | number | null
    source?: StringNullableFilter<"productsub"> | string | null
    createdAt?: DateTimeFilter<"productsub"> | Date | string
    updatedAt?: DateTimeFilter<"productsub"> | Date | string
  }

  export type productsubOrderByWithRelationInput = {
    id?: SortOrder
    fk_product_main_in_productsub?: SortOrderInput | SortOrder
    fk_product_sub_in_productsub?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsubWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: productsubWhereInput | productsubWhereInput[]
    OR?: productsubWhereInput[]
    NOT?: productsubWhereInput | productsubWhereInput[]
    fk_product_main_in_productsub?: StringNullableFilter<"productsub"> | string | null
    fk_product_sub_in_productsub?: StringNullableFilter<"productsub"> | string | null
    quantity?: FloatNullableFilter<"productsub"> | number | null
    source?: StringNullableFilter<"productsub"> | string | null
    createdAt?: DateTimeFilter<"productsub"> | Date | string
    updatedAt?: DateTimeFilter<"productsub"> | Date | string
  }, "id">

  export type productsubOrderByWithAggregationInput = {
    id?: SortOrder
    fk_product_main_in_productsub?: SortOrderInput | SortOrder
    fk_product_sub_in_productsub?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: productsubCountOrderByAggregateInput
    _avg?: productsubAvgOrderByAggregateInput
    _max?: productsubMaxOrderByAggregateInput
    _min?: productsubMinOrderByAggregateInput
    _sum?: productsubSumOrderByAggregateInput
  }

  export type productsubScalarWhereWithAggregatesInput = {
    AND?: productsubScalarWhereWithAggregatesInput | productsubScalarWhereWithAggregatesInput[]
    OR?: productsubScalarWhereWithAggregatesInput[]
    NOT?: productsubScalarWhereWithAggregatesInput | productsubScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"productsub"> | string
    fk_product_main_in_productsub?: StringNullableWithAggregatesFilter<"productsub"> | string | null
    fk_product_sub_in_productsub?: StringNullableWithAggregatesFilter<"productsub"> | string | null
    quantity?: FloatNullableWithAggregatesFilter<"productsub"> | number | null
    source?: StringNullableWithAggregatesFilter<"productsub"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"productsub"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"productsub"> | Date | string
  }

  export type purchaseWhereInput = {
    AND?: purchaseWhereInput | purchaseWhereInput[]
    OR?: purchaseWhereInput[]
    NOT?: purchaseWhereInput | purchaseWhereInput[]
    id?: StringFilter<"purchase"> | string
    createdby?: StringNullableFilter<"purchase"> | string | null
    updatedby?: StringNullableFilter<"purchase"> | string | null
    vendor?: StringNullableFilter<"purchase"> | string | null
    totalAmount?: FloatNullableFilter<"purchase"> | number | null
    totalPayment?: FloatNullableFilter<"purchase"> | number | null
    invoicenum?: StringNullableFilter<"purchase"> | string | null
    source?: StringNullableFilter<"purchase"> | string | null
    createdAt?: DateTimeFilter<"purchase"> | Date | string
    updatedAt?: DateTimeFilter<"purchase"> | Date | string
  }

  export type purchaseOrderByWithRelationInput = {
    id?: SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    vendor?: SortOrderInput | SortOrder
    totalAmount?: SortOrderInput | SortOrder
    totalPayment?: SortOrderInput | SortOrder
    invoicenum?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: purchaseWhereInput | purchaseWhereInput[]
    OR?: purchaseWhereInput[]
    NOT?: purchaseWhereInput | purchaseWhereInput[]
    createdby?: StringNullableFilter<"purchase"> | string | null
    updatedby?: StringNullableFilter<"purchase"> | string | null
    vendor?: StringNullableFilter<"purchase"> | string | null
    totalAmount?: FloatNullableFilter<"purchase"> | number | null
    totalPayment?: FloatNullableFilter<"purchase"> | number | null
    invoicenum?: StringNullableFilter<"purchase"> | string | null
    source?: StringNullableFilter<"purchase"> | string | null
    createdAt?: DateTimeFilter<"purchase"> | Date | string
    updatedAt?: DateTimeFilter<"purchase"> | Date | string
  }, "id">

  export type purchaseOrderByWithAggregationInput = {
    id?: SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    vendor?: SortOrderInput | SortOrder
    totalAmount?: SortOrderInput | SortOrder
    totalPayment?: SortOrderInput | SortOrder
    invoicenum?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: purchaseCountOrderByAggregateInput
    _avg?: purchaseAvgOrderByAggregateInput
    _max?: purchaseMaxOrderByAggregateInput
    _min?: purchaseMinOrderByAggregateInput
    _sum?: purchaseSumOrderByAggregateInput
  }

  export type purchaseScalarWhereWithAggregatesInput = {
    AND?: purchaseScalarWhereWithAggregatesInput | purchaseScalarWhereWithAggregatesInput[]
    OR?: purchaseScalarWhereWithAggregatesInput[]
    NOT?: purchaseScalarWhereWithAggregatesInput | purchaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"purchase"> | string
    createdby?: StringNullableWithAggregatesFilter<"purchase"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"purchase"> | string | null
    vendor?: StringNullableWithAggregatesFilter<"purchase"> | string | null
    totalAmount?: FloatNullableWithAggregatesFilter<"purchase"> | number | null
    totalPayment?: FloatNullableWithAggregatesFilter<"purchase"> | number | null
    invoicenum?: StringNullableWithAggregatesFilter<"purchase"> | string | null
    source?: StringNullableWithAggregatesFilter<"purchase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"purchase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"purchase"> | Date | string
  }

  export type purchasedproductsWhereInput = {
    AND?: purchasedproductsWhereInput | purchasedproductsWhereInput[]
    OR?: purchasedproductsWhereInput[]
    NOT?: purchasedproductsWhereInput | purchasedproductsWhereInput[]
    id?: StringFilter<"purchasedproducts"> | string
    purchase?: StringNullableFilter<"purchasedproducts"> | string | null
    product?: StringNullableFilter<"purchasedproducts"> | string | null
    quantity?: IntNullableFilter<"purchasedproducts"> | number | null
    totalAmount?: FloatNullableFilter<"purchasedproducts"> | number | null
    source?: StringNullableFilter<"purchasedproducts"> | string | null
    createdAt?: DateTimeFilter<"purchasedproducts"> | Date | string
    updatedAt?: DateTimeFilter<"purchasedproducts"> | Date | string
  }

  export type purchasedproductsOrderByWithRelationInput = {
    id?: SortOrder
    purchase?: SortOrderInput | SortOrder
    product?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    totalAmount?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchasedproductsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: purchasedproductsWhereInput | purchasedproductsWhereInput[]
    OR?: purchasedproductsWhereInput[]
    NOT?: purchasedproductsWhereInput | purchasedproductsWhereInput[]
    purchase?: StringNullableFilter<"purchasedproducts"> | string | null
    product?: StringNullableFilter<"purchasedproducts"> | string | null
    quantity?: IntNullableFilter<"purchasedproducts"> | number | null
    totalAmount?: FloatNullableFilter<"purchasedproducts"> | number | null
    source?: StringNullableFilter<"purchasedproducts"> | string | null
    createdAt?: DateTimeFilter<"purchasedproducts"> | Date | string
    updatedAt?: DateTimeFilter<"purchasedproducts"> | Date | string
  }, "id">

  export type purchasedproductsOrderByWithAggregationInput = {
    id?: SortOrder
    purchase?: SortOrderInput | SortOrder
    product?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    totalAmount?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: purchasedproductsCountOrderByAggregateInput
    _avg?: purchasedproductsAvgOrderByAggregateInput
    _max?: purchasedproductsMaxOrderByAggregateInput
    _min?: purchasedproductsMinOrderByAggregateInput
    _sum?: purchasedproductsSumOrderByAggregateInput
  }

  export type purchasedproductsScalarWhereWithAggregatesInput = {
    AND?: purchasedproductsScalarWhereWithAggregatesInput | purchasedproductsScalarWhereWithAggregatesInput[]
    OR?: purchasedproductsScalarWhereWithAggregatesInput[]
    NOT?: purchasedproductsScalarWhereWithAggregatesInput | purchasedproductsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"purchasedproducts"> | string
    purchase?: StringNullableWithAggregatesFilter<"purchasedproducts"> | string | null
    product?: StringNullableWithAggregatesFilter<"purchasedproducts"> | string | null
    quantity?: IntNullableWithAggregatesFilter<"purchasedproducts"> | number | null
    totalAmount?: FloatNullableWithAggregatesFilter<"purchasedproducts"> | number | null
    source?: StringNullableWithAggregatesFilter<"purchasedproducts"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"purchasedproducts"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"purchasedproducts"> | Date | string
  }

  export type saleWhereInput = {
    AND?: saleWhereInput | saleWhereInput[]
    OR?: saleWhereInput[]
    NOT?: saleWhereInput | saleWhereInput[]
    id?: StringFilter<"sale"> | string
    user?: StringNullableFilter<"sale"> | string | null
    customer?: StringNullableFilter<"sale"> | string | null
    invoicenum?: StringNullableFilter<"sale"> | string | null
    discountpercentage?: StringNullableFilter<"sale"> | string | null
    totalprice?: StringNullableFilter<"sale"> | string | null
    totalpayment?: StringNullableFilter<"sale"> | string | null
    createdby?: StringNullableFilter<"sale"> | string | null
    updatedby?: StringNullableFilter<"sale"> | string | null
    source?: StringNullableFilter<"sale"> | string | null
    createdAt?: DateTimeFilter<"sale"> | Date | string
    updatedAt?: DateTimeFilter<"sale"> | Date | string
  }

  export type saleOrderByWithRelationInput = {
    id?: SortOrder
    user?: SortOrderInput | SortOrder
    customer?: SortOrderInput | SortOrder
    invoicenum?: SortOrderInput | SortOrder
    discountpercentage?: SortOrderInput | SortOrder
    totalprice?: SortOrderInput | SortOrder
    totalpayment?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type saleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: saleWhereInput | saleWhereInput[]
    OR?: saleWhereInput[]
    NOT?: saleWhereInput | saleWhereInput[]
    user?: StringNullableFilter<"sale"> | string | null
    customer?: StringNullableFilter<"sale"> | string | null
    invoicenum?: StringNullableFilter<"sale"> | string | null
    discountpercentage?: StringNullableFilter<"sale"> | string | null
    totalprice?: StringNullableFilter<"sale"> | string | null
    totalpayment?: StringNullableFilter<"sale"> | string | null
    createdby?: StringNullableFilter<"sale"> | string | null
    updatedby?: StringNullableFilter<"sale"> | string | null
    source?: StringNullableFilter<"sale"> | string | null
    createdAt?: DateTimeFilter<"sale"> | Date | string
    updatedAt?: DateTimeFilter<"sale"> | Date | string
  }, "id">

  export type saleOrderByWithAggregationInput = {
    id?: SortOrder
    user?: SortOrderInput | SortOrder
    customer?: SortOrderInput | SortOrder
    invoicenum?: SortOrderInput | SortOrder
    discountpercentage?: SortOrderInput | SortOrder
    totalprice?: SortOrderInput | SortOrder
    totalpayment?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: saleCountOrderByAggregateInput
    _max?: saleMaxOrderByAggregateInput
    _min?: saleMinOrderByAggregateInput
  }

  export type saleScalarWhereWithAggregatesInput = {
    AND?: saleScalarWhereWithAggregatesInput | saleScalarWhereWithAggregatesInput[]
    OR?: saleScalarWhereWithAggregatesInput[]
    NOT?: saleScalarWhereWithAggregatesInput | saleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"sale"> | string
    user?: StringNullableWithAggregatesFilter<"sale"> | string | null
    customer?: StringNullableWithAggregatesFilter<"sale"> | string | null
    invoicenum?: StringNullableWithAggregatesFilter<"sale"> | string | null
    discountpercentage?: StringNullableWithAggregatesFilter<"sale"> | string | null
    totalprice?: StringNullableWithAggregatesFilter<"sale"> | string | null
    totalpayment?: StringNullableWithAggregatesFilter<"sale"> | string | null
    createdby?: StringNullableWithAggregatesFilter<"sale"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"sale"> | string | null
    source?: StringNullableWithAggregatesFilter<"sale"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"sale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"sale"> | Date | string
  }

  export type softwaresettingWhereInput = {
    AND?: softwaresettingWhereInput | softwaresettingWhereInput[]
    OR?: softwaresettingWhereInput[]
    NOT?: softwaresettingWhereInput | softwaresettingWhereInput[]
    id?: StringFilter<"softwaresetting"> | string
    name?: StringNullableFilter<"softwaresetting"> | string | null
    value?: StringNullableFilter<"softwaresetting"> | string | null
    source?: StringNullableFilter<"softwaresetting"> | string | null
  }

  export type softwaresettingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
  }

  export type softwaresettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: softwaresettingWhereInput | softwaresettingWhereInput[]
    OR?: softwaresettingWhereInput[]
    NOT?: softwaresettingWhereInput | softwaresettingWhereInput[]
    name?: StringNullableFilter<"softwaresetting"> | string | null
    value?: StringNullableFilter<"softwaresetting"> | string | null
    source?: StringNullableFilter<"softwaresetting"> | string | null
  }, "id">

  export type softwaresettingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    _count?: softwaresettingCountOrderByAggregateInput
    _max?: softwaresettingMaxOrderByAggregateInput
    _min?: softwaresettingMinOrderByAggregateInput
  }

  export type softwaresettingScalarWhereWithAggregatesInput = {
    AND?: softwaresettingScalarWhereWithAggregatesInput | softwaresettingScalarWhereWithAggregatesInput[]
    OR?: softwaresettingScalarWhereWithAggregatesInput[]
    NOT?: softwaresettingScalarWhereWithAggregatesInput | softwaresettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"softwaresetting"> | string
    name?: StringNullableWithAggregatesFilter<"softwaresetting"> | string | null
    value?: StringNullableWithAggregatesFilter<"softwaresetting"> | string | null
    source?: StringNullableWithAggregatesFilter<"softwaresetting"> | string | null
  }

  export type soldproductsWhereInput = {
    AND?: soldproductsWhereInput | soldproductsWhereInput[]
    OR?: soldproductsWhereInput[]
    NOT?: soldproductsWhereInput | soldproductsWhereInput[]
    id?: StringFilter<"soldproducts"> | string
    sale?: StringNullableFilter<"soldproducts"> | string | null
    product?: StringNullableFilter<"soldproducts"> | string | null
    quantity?: IntNullableFilter<"soldproducts"> | number | null
    price?: FloatNullableFilter<"soldproducts"> | number | null
    source?: StringNullableFilter<"soldproducts"> | string | null
    createdAt?: DateTimeFilter<"soldproducts"> | Date | string
    updatedAt?: DateTimeFilter<"soldproducts"> | Date | string
  }

  export type soldproductsOrderByWithRelationInput = {
    id?: SortOrder
    sale?: SortOrderInput | SortOrder
    product?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldproductsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: soldproductsWhereInput | soldproductsWhereInput[]
    OR?: soldproductsWhereInput[]
    NOT?: soldproductsWhereInput | soldproductsWhereInput[]
    sale?: StringNullableFilter<"soldproducts"> | string | null
    product?: StringNullableFilter<"soldproducts"> | string | null
    quantity?: IntNullableFilter<"soldproducts"> | number | null
    price?: FloatNullableFilter<"soldproducts"> | number | null
    source?: StringNullableFilter<"soldproducts"> | string | null
    createdAt?: DateTimeFilter<"soldproducts"> | Date | string
    updatedAt?: DateTimeFilter<"soldproducts"> | Date | string
  }, "id">

  export type soldproductsOrderByWithAggregationInput = {
    id?: SortOrder
    sale?: SortOrderInput | SortOrder
    product?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: soldproductsCountOrderByAggregateInput
    _avg?: soldproductsAvgOrderByAggregateInput
    _max?: soldproductsMaxOrderByAggregateInput
    _min?: soldproductsMinOrderByAggregateInput
    _sum?: soldproductsSumOrderByAggregateInput
  }

  export type soldproductsScalarWhereWithAggregatesInput = {
    AND?: soldproductsScalarWhereWithAggregatesInput | soldproductsScalarWhereWithAggregatesInput[]
    OR?: soldproductsScalarWhereWithAggregatesInput[]
    NOT?: soldproductsScalarWhereWithAggregatesInput | soldproductsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"soldproducts"> | string
    sale?: StringNullableWithAggregatesFilter<"soldproducts"> | string | null
    product?: StringNullableWithAggregatesFilter<"soldproducts"> | string | null
    quantity?: IntNullableWithAggregatesFilter<"soldproducts"> | number | null
    price?: FloatNullableWithAggregatesFilter<"soldproducts"> | number | null
    source?: StringNullableWithAggregatesFilter<"soldproducts"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"soldproducts"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"soldproducts"> | Date | string
  }

  export type taxesWhereInput = {
    AND?: taxesWhereInput | taxesWhereInput[]
    OR?: taxesWhereInput[]
    NOT?: taxesWhereInput | taxesWhereInput[]
    id?: StringFilter<"taxes"> | string
    name?: StringNullableFilter<"taxes"> | string | null
    percentage?: FloatNullableFilter<"taxes"> | number | null
    source?: StringNullableFilter<"taxes"> | string | null
    createdAt?: DateTimeFilter<"taxes"> | Date | string
    updatedAt?: DateTimeFilter<"taxes"> | Date | string
  }

  export type taxesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    percentage?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type taxesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: taxesWhereInput | taxesWhereInput[]
    OR?: taxesWhereInput[]
    NOT?: taxesWhereInput | taxesWhereInput[]
    name?: StringNullableFilter<"taxes"> | string | null
    percentage?: FloatNullableFilter<"taxes"> | number | null
    source?: StringNullableFilter<"taxes"> | string | null
    createdAt?: DateTimeFilter<"taxes"> | Date | string
    updatedAt?: DateTimeFilter<"taxes"> | Date | string
  }, "id">

  export type taxesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    percentage?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: taxesCountOrderByAggregateInput
    _avg?: taxesAvgOrderByAggregateInput
    _max?: taxesMaxOrderByAggregateInput
    _min?: taxesMinOrderByAggregateInput
    _sum?: taxesSumOrderByAggregateInput
  }

  export type taxesScalarWhereWithAggregatesInput = {
    AND?: taxesScalarWhereWithAggregatesInput | taxesScalarWhereWithAggregatesInput[]
    OR?: taxesScalarWhereWithAggregatesInput[]
    NOT?: taxesScalarWhereWithAggregatesInput | taxesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"taxes"> | string
    name?: StringNullableWithAggregatesFilter<"taxes"> | string | null
    percentage?: FloatNullableWithAggregatesFilter<"taxes"> | number | null
    source?: StringNullableWithAggregatesFilter<"taxes"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"taxes"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"taxes"> | Date | string
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    address?: StringNullableFilter<"user"> | string | null
    account_key?: StringNullableFilter<"user"> | string | null
    email?: StringNullableFilter<"user"> | string | null
    firstname?: StringNullableFilter<"user"> | string | null
    lastname?: StringNullableFilter<"user"> | string | null
    password?: StringNullableFilter<"user"> | string | null
    username?: StringNullableFilter<"user"> | string | null
    phone?: StringNullableFilter<"user"> | string | null
    phone2?: StringNullableFilter<"user"> | string | null
    role?: StringNullableFilter<"user"> | string | null
    createdby?: StringNullableFilter<"user"> | string | null
    updatedby?: StringNullableFilter<"user"> | string | null
    source?: StringNullableFilter<"user"> | string | null
    profile_image_url?: StringNullableFilter<"user"> | string | null
    dashboard_config?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrderInput | SortOrder
    account_key?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    phone2?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    profile_image_url?: SortOrderInput | SortOrder
    dashboard_config?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    address?: StringNullableFilter<"user"> | string | null
    account_key?: StringNullableFilter<"user"> | string | null
    email?: StringNullableFilter<"user"> | string | null
    firstname?: StringNullableFilter<"user"> | string | null
    lastname?: StringNullableFilter<"user"> | string | null
    password?: StringNullableFilter<"user"> | string | null
    username?: StringNullableFilter<"user"> | string | null
    phone?: StringNullableFilter<"user"> | string | null
    phone2?: StringNullableFilter<"user"> | string | null
    role?: StringNullableFilter<"user"> | string | null
    createdby?: StringNullableFilter<"user"> | string | null
    updatedby?: StringNullableFilter<"user"> | string | null
    source?: StringNullableFilter<"user"> | string | null
    profile_image_url?: StringNullableFilter<"user"> | string | null
    dashboard_config?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
  }, "id">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrderInput | SortOrder
    account_key?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    phone2?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    createdby?: SortOrderInput | SortOrder
    updatedby?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    profile_image_url?: SortOrderInput | SortOrder
    dashboard_config?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    address?: StringNullableWithAggregatesFilter<"user"> | string | null
    account_key?: StringNullableWithAggregatesFilter<"user"> | string | null
    email?: StringNullableWithAggregatesFilter<"user"> | string | null
    firstname?: StringNullableWithAggregatesFilter<"user"> | string | null
    lastname?: StringNullableWithAggregatesFilter<"user"> | string | null
    password?: StringNullableWithAggregatesFilter<"user"> | string | null
    username?: StringNullableWithAggregatesFilter<"user"> | string | null
    phone?: StringNullableWithAggregatesFilter<"user"> | string | null
    phone2?: StringNullableWithAggregatesFilter<"user"> | string | null
    role?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdby?: StringNullableWithAggregatesFilter<"user"> | string | null
    updatedby?: StringNullableWithAggregatesFilter<"user"> | string | null
    source?: StringNullableWithAggregatesFilter<"user"> | string | null
    profile_image_url?: StringNullableWithAggregatesFilter<"user"> | string | null
    dashboard_config?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
  }

  export type SequelizeMetaCreateInput = {
    name: string
  }

  export type SequelizeMetaUncheckedCreateInput = {
    name: string
  }

  export type SequelizeMetaUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SequelizeMetaUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SequelizeMetaCreateManyInput = {
    name: string
  }

  export type SequelizeMetaUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SequelizeMetaUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type brandCreateInput = {
    id: string
    name: string
    description?: string | null
    status?: boolean | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type brandUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    status?: boolean | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type brandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type brandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type brandCreateManyInput = {
    id: string
    name: string
    description?: string | null
    status?: boolean | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type brandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type brandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cashclosingCreateInput = {
    id: string
    closingbalance?: number | null
    date?: Date | string | null
    expence?: number | null
    note?: string | null
    sale?: number | null
    fk_user_in_cashclosing?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type cashclosingUncheckedCreateInput = {
    id: string
    closingbalance?: number | null
    date?: Date | string | null
    expence?: number | null
    note?: string | null
    sale?: number | null
    fk_user_in_cashclosing?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type cashclosingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    closingbalance?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expence?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    sale?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_user_in_cashclosing?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cashclosingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    closingbalance?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expence?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    sale?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_user_in_cashclosing?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cashclosingCreateManyInput = {
    id: string
    closingbalance?: number | null
    date?: Date | string | null
    expence?: number | null
    note?: string | null
    sale?: number | null
    fk_user_in_cashclosing?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type cashclosingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    closingbalance?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expence?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    sale?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_user_in_cashclosing?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cashclosingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    closingbalance?: NullableFloatFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expence?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    sale?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_user_in_cashclosing?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryCreateInput = {
    id: string
    name: string
    description?: string | null
    status?: boolean | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type categoryUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    status?: boolean | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type categoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryCreateManyInput = {
    id: string
    name: string
    description?: string | null
    status?: boolean | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type categoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financeaccountCreateInput = {
    id: string
    name?: string | null
    type?: string | null
    fk_parent_in_financeaccount?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    value?: Decimal | DecimalJsLike | number | string | null
    isDefault?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type financeaccountUncheckedCreateInput = {
    id: string
    name?: string | null
    type?: string | null
    fk_parent_in_financeaccount?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    value?: Decimal | DecimalJsLike | number | string | null
    isDefault?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type financeaccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    fk_parent_in_financeaccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financeaccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    fk_parent_in_financeaccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financeaccountCreateManyInput = {
    id: string
    name?: string | null
    type?: string | null
    fk_parent_in_financeaccount?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    value?: Decimal | DecimalJsLike | number | string | null
    isDefault?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type financeaccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    fk_parent_in_financeaccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financeaccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    fk_parent_in_financeaccount?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financetransactionCreateInput = {
    id: string
    name?: string | null
    amount?: number | null
    status?: string | null
    date?: Date | string | null
    details?: string | null
    source?: string | null
    fk_user_targetto_in_financetransaction?: string | null
    fk_financeaccount_in_financetransaction?: string | null
    createdby?: string | null
    updatedby?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type financetransactionUncheckedCreateInput = {
    id: string
    name?: string | null
    amount?: number | null
    status?: string | null
    date?: Date | string | null
    details?: string | null
    source?: string | null
    fk_user_targetto_in_financetransaction?: string | null
    fk_financeaccount_in_financetransaction?: string | null
    createdby?: string | null
    updatedby?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type financetransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    fk_user_targetto_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financeaccount_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financetransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    fk_user_targetto_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financeaccount_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financetransactionCreateManyInput = {
    id: string
    name?: string | null
    amount?: number | null
    status?: string | null
    date?: Date | string | null
    details?: string | null
    source?: string | null
    fk_user_targetto_in_financetransaction?: string | null
    fk_financeaccount_in_financetransaction?: string | null
    createdby?: string | null
    updatedby?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type financetransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    fk_user_targetto_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financeaccount_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type financetransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    fk_user_targetto_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financeaccount_in_financetransaction?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type inventorylogsCreateInput = {
    id: string
    product_id: string
    quantity: number
    note?: string | null
    createdby: string
    type: string
    vendor?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type inventorylogsUncheckedCreateInput = {
    id: string
    product_id: string
    quantity: number
    note?: string | null
    createdby: string
    type: string
    vendor?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type inventorylogsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type inventorylogsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type inventorylogsCreateManyInput = {
    id: string
    product_id: string
    quantity: number
    note?: string | null
    createdby: string
    type: string
    vendor?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type inventorylogsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type inventorylogsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productCreateInput = {
    id: string
    barcode?: string | null
    brand?: string | null
    carrycost?: number | null
    category?: string | null
    discount?: number | null
    ispurchaseable?: boolean | null
    issaleable?: boolean | null
    name?: string | null
    purchaseactive?: boolean | null
    purchaseprice?: number | null
    quantity?: number | null
    saleactive?: boolean | null
    saleprice?: number | null
    taxid?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
  }

  export type productUncheckedCreateInput = {
    id: string
    barcode?: string | null
    brand?: string | null
    carrycost?: number | null
    category?: string | null
    discount?: number | null
    ispurchaseable?: boolean | null
    issaleable?: boolean | null
    name?: string | null
    purchaseactive?: boolean | null
    purchaseprice?: number | null
    quantity?: number | null
    saleactive?: boolean | null
    saleprice?: number | null
    taxid?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
  }

  export type productUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    carrycost?: NullableFloatFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    ispurchaseable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    issaleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    purchaseprice?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    saleactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    saleprice?: NullableFloatFieldUpdateOperationsInput | number | null
    taxid?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    carrycost?: NullableFloatFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    ispurchaseable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    issaleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    purchaseprice?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    saleactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    saleprice?: NullableFloatFieldUpdateOperationsInput | number | null
    taxid?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productCreateManyInput = {
    id: string
    barcode?: string | null
    brand?: string | null
    carrycost?: number | null
    category?: string | null
    discount?: number | null
    ispurchaseable?: boolean | null
    issaleable?: boolean | null
    name?: string | null
    purchaseactive?: boolean | null
    purchaseprice?: number | null
    quantity?: number | null
    saleactive?: boolean | null
    saleprice?: number | null
    taxid?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
  }

  export type productUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    carrycost?: NullableFloatFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    ispurchaseable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    issaleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    purchaseprice?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    saleactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    saleprice?: NullableFloatFieldUpdateOperationsInput | number | null
    taxid?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    carrycost?: NullableFloatFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    ispurchaseable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    issaleable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    purchaseprice?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    saleactive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    saleprice?: NullableFloatFieldUpdateOperationsInput | number | null
    taxid?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productbatchesCreateInput = {
    id: string
    product?: string | null
    expirydate?: Date | string | null
    quantity?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productbatchesUncheckedCreateInput = {
    id: string
    product?: string | null
    expirydate?: Date | string | null
    quantity?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productbatchesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product?: NullableStringFieldUpdateOperationsInput | string | null
    expirydate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productbatchesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product?: NullableStringFieldUpdateOperationsInput | string | null
    expirydate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productbatchesCreateManyInput = {
    id: string
    product?: string | null
    expirydate?: Date | string | null
    quantity?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productbatchesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product?: NullableStringFieldUpdateOperationsInput | string | null
    expirydate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productbatchesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    product?: NullableStringFieldUpdateOperationsInput | string | null
    expirydate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsalepurchaseCreateInput = {
    id: string
    price?: number | null
    quantity?: number | null
    total?: number | null
    fk_product_in_productsalepurchase?: string | null
    fk_financetransaction_in_productsalepurchase?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productsalepurchaseUncheckedCreateInput = {
    id: string
    price?: number | null
    quantity?: number | null
    total?: number | null
    fk_product_in_productsalepurchase?: string | null
    fk_financetransaction_in_productsalepurchase?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productsalepurchaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    total?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_product_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financetransaction_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsalepurchaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    total?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_product_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financetransaction_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsalepurchaseCreateManyInput = {
    id: string
    price?: number | null
    quantity?: number | null
    total?: number | null
    fk_product_in_productsalepurchase?: string | null
    fk_financetransaction_in_productsalepurchase?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productsalepurchaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    total?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_product_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financetransaction_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsalepurchaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    total?: NullableFloatFieldUpdateOperationsInput | number | null
    fk_product_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    fk_financetransaction_in_productsalepurchase?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsubCreateInput = {
    id: string
    fk_product_main_in_productsub?: string | null
    fk_product_sub_in_productsub?: string | null
    quantity?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productsubUncheckedCreateInput = {
    id: string
    fk_product_main_in_productsub?: string | null
    fk_product_sub_in_productsub?: string | null
    quantity?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productsubUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fk_product_main_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    fk_product_sub_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsubUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fk_product_main_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    fk_product_sub_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsubCreateManyInput = {
    id: string
    fk_product_main_in_productsub?: string | null
    fk_product_sub_in_productsub?: string | null
    quantity?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type productsubUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fk_product_main_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    fk_product_sub_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productsubUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fk_product_main_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    fk_product_sub_in_productsub?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchaseCreateInput = {
    id: string
    createdby?: string | null
    updatedby?: string | null
    vendor?: string | null
    totalAmount?: number | null
    totalPayment?: number | null
    invoicenum?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type purchaseUncheckedCreateInput = {
    id: string
    createdby?: string | null
    updatedby?: string | null
    vendor?: string | null
    totalAmount?: number | null
    totalPayment?: number | null
    invoicenum?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type purchaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchaseCreateManyInput = {
    id: string
    createdby?: string | null
    updatedby?: string | null
    vendor?: string | null
    totalAmount?: number | null
    totalPayment?: number | null
    invoicenum?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type purchaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    vendor?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchasedproductsCreateInput = {
    id: string
    purchase?: string | null
    product?: string | null
    quantity?: number | null
    totalAmount?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type purchasedproductsUncheckedCreateInput = {
    id: string
    purchase?: string | null
    product?: string | null
    quantity?: number | null
    totalAmount?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type purchasedproductsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchase?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchasedproductsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchase?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchasedproductsCreateManyInput = {
    id: string
    purchase?: string | null
    product?: string | null
    quantity?: number | null
    totalAmount?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type purchasedproductsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchase?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type purchasedproductsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchase?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type saleCreateInput = {
    id: string
    user?: string | null
    customer?: string | null
    invoicenum?: string | null
    discountpercentage?: string | null
    totalprice?: string | null
    totalpayment?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type saleUncheckedCreateInput = {
    id: string
    user?: string | null
    customer?: string | null
    invoicenum?: string | null
    discountpercentage?: string | null
    totalprice?: string | null
    totalpayment?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type saleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: NullableStringFieldUpdateOperationsInput | string | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    discountpercentage?: NullableStringFieldUpdateOperationsInput | string | null
    totalprice?: NullableStringFieldUpdateOperationsInput | string | null
    totalpayment?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type saleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: NullableStringFieldUpdateOperationsInput | string | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    discountpercentage?: NullableStringFieldUpdateOperationsInput | string | null
    totalprice?: NullableStringFieldUpdateOperationsInput | string | null
    totalpayment?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type saleCreateManyInput = {
    id: string
    user?: string | null
    customer?: string | null
    invoicenum?: string | null
    discountpercentage?: string | null
    totalprice?: string | null
    totalpayment?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type saleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: NullableStringFieldUpdateOperationsInput | string | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    discountpercentage?: NullableStringFieldUpdateOperationsInput | string | null
    totalprice?: NullableStringFieldUpdateOperationsInput | string | null
    totalpayment?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type saleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: NullableStringFieldUpdateOperationsInput | string | null
    invoicenum?: NullableStringFieldUpdateOperationsInput | string | null
    discountpercentage?: NullableStringFieldUpdateOperationsInput | string | null
    totalprice?: NullableStringFieldUpdateOperationsInput | string | null
    totalpayment?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type softwaresettingCreateInput = {
    id: string
    name?: string | null
    value?: string | null
    source?: string | null
  }

  export type softwaresettingUncheckedCreateInput = {
    id: string
    name?: string | null
    value?: string | null
    source?: string | null
  }

  export type softwaresettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type softwaresettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type softwaresettingCreateManyInput = {
    id: string
    name?: string | null
    value?: string | null
    source?: string | null
  }

  export type softwaresettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type softwaresettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type soldproductsCreateInput = {
    id: string
    sale?: string | null
    product?: string | null
    quantity?: number | null
    price?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type soldproductsUncheckedCreateInput = {
    id: string
    sale?: string | null
    product?: string | null
    quantity?: number | null
    price?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type soldproductsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sale?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldproductsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sale?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldproductsCreateManyInput = {
    id: string
    sale?: string | null
    product?: string | null
    quantity?: number | null
    price?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type soldproductsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sale?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldproductsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sale?: NullableStringFieldUpdateOperationsInput | string | null
    product?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type taxesCreateInput = {
    id: string
    name?: string | null
    percentage?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type taxesUncheckedCreateInput = {
    id: string
    name?: string | null
    percentage?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type taxesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type taxesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type taxesCreateManyInput = {
    id: string
    name?: string | null
    percentage?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type taxesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type taxesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateInput = {
    id: string
    address?: string | null
    account_key?: string | null
    email?: string | null
    firstname?: string | null
    lastname?: string | null
    password?: string | null
    username?: string | null
    phone?: string | null
    phone2?: string | null
    role?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    profile_image_url?: string | null
    dashboard_config?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userUncheckedCreateInput = {
    id: string
    address?: string | null
    account_key?: string | null
    email?: string | null
    firstname?: string | null
    lastname?: string | null
    password?: string | null
    username?: string | null
    phone?: string | null
    phone2?: string | null
    role?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    profile_image_url?: string | null
    dashboard_config?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    account_key?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard_config?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    account_key?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard_config?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateManyInput = {
    id: string
    address?: string | null
    account_key?: string | null
    email?: string | null
    firstname?: string | null
    lastname?: string | null
    password?: string | null
    username?: string | null
    phone?: string | null
    phone2?: string | null
    role?: string | null
    createdby?: string | null
    updatedby?: string | null
    source?: string | null
    profile_image_url?: string | null
    dashboard_config?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    account_key?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard_config?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    account_key?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdby?: NullableStringFieldUpdateOperationsInput | string | null
    updatedby?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard_config?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type SequelizeMetaCountOrderByAggregateInput = {
    name?: SortOrder
  }

  export type SequelizeMetaMaxOrderByAggregateInput = {
    name?: SortOrder
  }

  export type SequelizeMetaMinOrderByAggregateInput = {
    name?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type brandCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type brandMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type brandMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type cashclosingCountOrderByAggregateInput = {
    id?: SortOrder
    closingbalance?: SortOrder
    date?: SortOrder
    expence?: SortOrder
    note?: SortOrder
    sale?: SortOrder
    fk_user_in_cashclosing?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type cashclosingAvgOrderByAggregateInput = {
    closingbalance?: SortOrder
    expence?: SortOrder
    sale?: SortOrder
  }

  export type cashclosingMaxOrderByAggregateInput = {
    id?: SortOrder
    closingbalance?: SortOrder
    date?: SortOrder
    expence?: SortOrder
    note?: SortOrder
    sale?: SortOrder
    fk_user_in_cashclosing?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type cashclosingMinOrderByAggregateInput = {
    id?: SortOrder
    closingbalance?: SortOrder
    date?: SortOrder
    expence?: SortOrder
    note?: SortOrder
    sale?: SortOrder
    fk_user_in_cashclosing?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type cashclosingSumOrderByAggregateInput = {
    closingbalance?: SortOrder
    expence?: SortOrder
    sale?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type categoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type categoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type categoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type financeaccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    fk_parent_in_financeaccount?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    value?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financeaccountAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type financeaccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    fk_parent_in_financeaccount?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    value?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financeaccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    fk_parent_in_financeaccount?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    value?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financeaccountSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type financetransactionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    date?: SortOrder
    details?: SortOrder
    source?: SortOrder
    fk_user_targetto_in_financetransaction?: SortOrder
    fk_financeaccount_in_financetransaction?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financetransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type financetransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    date?: SortOrder
    details?: SortOrder
    source?: SortOrder
    fk_user_targetto_in_financetransaction?: SortOrder
    fk_financeaccount_in_financetransaction?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financetransactionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    date?: SortOrder
    details?: SortOrder
    source?: SortOrder
    fk_user_targetto_in_financetransaction?: SortOrder
    fk_financeaccount_in_financetransaction?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type financetransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type inventorylogsCountOrderByAggregateInput = {
    id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    createdby?: SortOrder
    type?: SortOrder
    vendor?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type inventorylogsAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type inventorylogsMaxOrderByAggregateInput = {
    id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    createdby?: SortOrder
    type?: SortOrder
    vendor?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type inventorylogsMinOrderByAggregateInput = {
    id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    createdby?: SortOrder
    type?: SortOrder
    vendor?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type inventorylogsSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type productCountOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    brand?: SortOrder
    carrycost?: SortOrder
    category?: SortOrder
    discount?: SortOrder
    ispurchaseable?: SortOrder
    issaleable?: SortOrder
    name?: SortOrder
    purchaseactive?: SortOrder
    purchaseprice?: SortOrder
    quantity?: SortOrder
    saleactive?: SortOrder
    saleprice?: SortOrder
    taxid?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
  }

  export type productAvgOrderByAggregateInput = {
    carrycost?: SortOrder
    discount?: SortOrder
    purchaseprice?: SortOrder
    quantity?: SortOrder
    saleprice?: SortOrder
  }

  export type productMaxOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    brand?: SortOrder
    carrycost?: SortOrder
    category?: SortOrder
    discount?: SortOrder
    ispurchaseable?: SortOrder
    issaleable?: SortOrder
    name?: SortOrder
    purchaseactive?: SortOrder
    purchaseprice?: SortOrder
    quantity?: SortOrder
    saleactive?: SortOrder
    saleprice?: SortOrder
    taxid?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
  }

  export type productMinOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    brand?: SortOrder
    carrycost?: SortOrder
    category?: SortOrder
    discount?: SortOrder
    ispurchaseable?: SortOrder
    issaleable?: SortOrder
    name?: SortOrder
    purchaseactive?: SortOrder
    purchaseprice?: SortOrder
    quantity?: SortOrder
    saleactive?: SortOrder
    saleprice?: SortOrder
    taxid?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
  }

  export type productSumOrderByAggregateInput = {
    carrycost?: SortOrder
    discount?: SortOrder
    purchaseprice?: SortOrder
    quantity?: SortOrder
    saleprice?: SortOrder
  }

  export type productbatchesCountOrderByAggregateInput = {
    id?: SortOrder
    product?: SortOrder
    expirydate?: SortOrder
    quantity?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productbatchesAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type productbatchesMaxOrderByAggregateInput = {
    id?: SortOrder
    product?: SortOrder
    expirydate?: SortOrder
    quantity?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productbatchesMinOrderByAggregateInput = {
    id?: SortOrder
    product?: SortOrder
    expirydate?: SortOrder
    quantity?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productbatchesSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type productsalepurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    total?: SortOrder
    fk_product_in_productsalepurchase?: SortOrder
    fk_financetransaction_in_productsalepurchase?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsalepurchaseAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    total?: SortOrder
  }

  export type productsalepurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    total?: SortOrder
    fk_product_in_productsalepurchase?: SortOrder
    fk_financetransaction_in_productsalepurchase?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsalepurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    total?: SortOrder
    fk_product_in_productsalepurchase?: SortOrder
    fk_financetransaction_in_productsalepurchase?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsalepurchaseSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    total?: SortOrder
  }

  export type productsubCountOrderByAggregateInput = {
    id?: SortOrder
    fk_product_main_in_productsub?: SortOrder
    fk_product_sub_in_productsub?: SortOrder
    quantity?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsubAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type productsubMaxOrderByAggregateInput = {
    id?: SortOrder
    fk_product_main_in_productsub?: SortOrder
    fk_product_sub_in_productsub?: SortOrder
    quantity?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsubMinOrderByAggregateInput = {
    id?: SortOrder
    fk_product_main_in_productsub?: SortOrder
    fk_product_sub_in_productsub?: SortOrder
    quantity?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type productsubSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type purchaseCountOrderByAggregateInput = {
    id?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    vendor?: SortOrder
    totalAmount?: SortOrder
    totalPayment?: SortOrder
    invoicenum?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchaseAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    totalPayment?: SortOrder
  }

  export type purchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    vendor?: SortOrder
    totalAmount?: SortOrder
    totalPayment?: SortOrder
    invoicenum?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchaseMinOrderByAggregateInput = {
    id?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    vendor?: SortOrder
    totalAmount?: SortOrder
    totalPayment?: SortOrder
    invoicenum?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchaseSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    totalPayment?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type purchasedproductsCountOrderByAggregateInput = {
    id?: SortOrder
    purchase?: SortOrder
    product?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchasedproductsAvgOrderByAggregateInput = {
    quantity?: SortOrder
    totalAmount?: SortOrder
  }

  export type purchasedproductsMaxOrderByAggregateInput = {
    id?: SortOrder
    purchase?: SortOrder
    product?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchasedproductsMinOrderByAggregateInput = {
    id?: SortOrder
    purchase?: SortOrder
    product?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type purchasedproductsSumOrderByAggregateInput = {
    quantity?: SortOrder
    totalAmount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type saleCountOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    customer?: SortOrder
    invoicenum?: SortOrder
    discountpercentage?: SortOrder
    totalprice?: SortOrder
    totalpayment?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type saleMaxOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    customer?: SortOrder
    invoicenum?: SortOrder
    discountpercentage?: SortOrder
    totalprice?: SortOrder
    totalpayment?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type saleMinOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    customer?: SortOrder
    invoicenum?: SortOrder
    discountpercentage?: SortOrder
    totalprice?: SortOrder
    totalpayment?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type softwaresettingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    source?: SortOrder
  }

  export type softwaresettingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    source?: SortOrder
  }

  export type softwaresettingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    source?: SortOrder
  }

  export type soldproductsCountOrderByAggregateInput = {
    id?: SortOrder
    sale?: SortOrder
    product?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldproductsAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type soldproductsMaxOrderByAggregateInput = {
    id?: SortOrder
    sale?: SortOrder
    product?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldproductsMinOrderByAggregateInput = {
    id?: SortOrder
    sale?: SortOrder
    product?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldproductsSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type taxesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    percentage?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type taxesAvgOrderByAggregateInput = {
    percentage?: SortOrder
  }

  export type taxesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    percentage?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type taxesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    percentage?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type taxesSumOrderByAggregateInput = {
    percentage?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    account_key?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    phone2?: SortOrder
    role?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    profile_image_url?: SortOrder
    dashboard_config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    account_key?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    phone2?: SortOrder
    role?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    profile_image_url?: SortOrder
    dashboard_config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    account_key?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    phone2?: SortOrder
    role?: SortOrder
    createdby?: SortOrder
    updatedby?: SortOrder
    source?: SortOrder
    profile_image_url?: SortOrder
    dashboard_config?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}