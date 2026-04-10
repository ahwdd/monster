
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CreatorProfile
 * 
 */
export type CreatorProfile = $Result.DefaultSelection<Prisma.$CreatorProfilePayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Platform: {
  FACEBOOK: 'FACEBOOK',
  INSTAGRAM: 'INSTAGRAM',
  KICK: 'KICK',
  TIKTOK: 'TIKTOK',
  TWITCH: 'TWITCH',
  YOUTUBE: 'YOUTUBE'
};

export type Platform = (typeof Platform)[keyof typeof Platform]


export const ContentType: {
  STREAM: 'STREAM',
  SHORT: 'SHORT',
  REEL: 'REEL'
};

export type ContentType = (typeof ContentType)[keyof typeof ContentType]


export const Rank: {
  UNRANKED: 'UNRANKED',
  ROOKIE_MONSTER: 'ROOKIE_MONSTER',
  RISING_MONSTER: 'RISING_MONSTER',
  ELITE_MONSTER: 'ELITE_MONSTER',
  MEGA_MONSTER: 'MEGA_MONSTER',
  COLD_MONSTER: 'COLD_MONSTER'
};

export type Rank = (typeof Rank)[keyof typeof Rank]


export const MonsterAppearance: {
  MONSTER_THEME: 'MONSTER_THEME',
  LAYOUT: 'LAYOUT',
  LOGO: 'LOGO',
  MONSTER_PRODUCTS: 'MONSTER_PRODUCTS'
};

export type MonsterAppearance = (typeof MonsterAppearance)[keyof typeof MonsterAppearance]


export const DiscoverySource: {
  FRIEND_RECOMMENDATION: 'FRIEND_RECOMMENDATION',
  COMMUNITY_MESSAGES: 'COMMUNITY_MESSAGES',
  SOCIAL_MEDIA_POSTS: 'SOCIAL_MEDIA_POSTS',
  MONSTER_EVENTS: 'MONSTER_EVENTS'
};

export type DiscoverySource = (typeof DiscoverySource)[keyof typeof DiscoverySource]


export const EventAttendance: {
  YES: 'YES',
  SOMETIMES: 'SOMETIMES',
  NO: 'NO'
};

export type EventAttendance = (typeof EventAttendance)[keyof typeof EventAttendance]


export const CreatorLevel: {
  LEVEL_1: 'LEVEL_1',
  LEVEL_2: 'LEVEL_2',
  LEVEL_3: 'LEVEL_3',
  LEVEL_4: 'LEVEL_4',
  LEVEL_5: 'LEVEL_5'
};

export type CreatorLevel = (typeof CreatorLevel)[keyof typeof CreatorLevel]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Platform = $Enums.Platform

export const Platform: typeof $Enums.Platform

export type ContentType = $Enums.ContentType

export const ContentType: typeof $Enums.ContentType

export type Rank = $Enums.Rank

export const Rank: typeof $Enums.Rank

export type MonsterAppearance = $Enums.MonsterAppearance

export const MonsterAppearance: typeof $Enums.MonsterAppearance

export type DiscoverySource = $Enums.DiscoverySource

export const DiscoverySource: typeof $Enums.DiscoverySource

export type EventAttendance = $Enums.EventAttendance

export const EventAttendance: typeof $Enums.EventAttendance

export type CreatorLevel = $Enums.CreatorLevel

export const CreatorLevel: typeof $Enums.CreatorLevel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creatorProfile`: Exposes CRUD operations for the **CreatorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorProfiles
    * const creatorProfiles = await prisma.creatorProfile.findMany()
    * ```
    */
  get creatorProfile(): Prisma.CreatorProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
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
    User: 'User',
    CreatorProfile: 'CreatorProfile',
    Submission: 'Submission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "creatorProfile" | "submission"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CreatorProfile: {
        payload: Prisma.$CreatorProfilePayload<ExtArgs>
        fields: Prisma.CreatorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>
          }
          findFirst: {
            args: Prisma.CreatorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>
          }
          findMany: {
            args: Prisma.CreatorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>[]
          }
          create: {
            args: Prisma.CreatorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>
          }
          createMany: {
            args: Prisma.CreatorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CreatorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>
          }
          update: {
            args: Prisma.CreatorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>
          }
          deleteMany: {
            args: Prisma.CreatorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CreatorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreatorProfilePayload>
          }
          aggregate: {
            args: Prisma.CreatorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreatorProfile>
          }
          groupBy: {
            args: Prisma.CreatorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreatorProfileGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CreatorProfileFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CreatorProfileAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CreatorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<CreatorProfileCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SubmissionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SubmissionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    }
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    creatorProfile?: CreatorProfileOmit
    submission?: SubmissionOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submissions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    externalId: string | null
    provider: string | null
    email: string | null
    phone: string | null
    phoneKey: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    isVerified: boolean | null
    isActive: boolean | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    externalId: string | null
    provider: string | null
    email: string | null
    phone: string | null
    phoneKey: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    isVerified: boolean | null
    isActive: boolean | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    externalId: number
    provider: number
    email: number
    phone: number
    phoneKey: number
    firstName: number
    lastName: number
    username: number
    isVerified: number
    isActive: number
    role: number
    createdAt: number
    updatedAt: number
    lastLogin: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    externalId?: true
    provider?: true
    email?: true
    phone?: true
    phoneKey?: true
    firstName?: true
    lastName?: true
    username?: true
    isVerified?: true
    isActive?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    externalId?: true
    provider?: true
    email?: true
    phone?: true
    phoneKey?: true
    firstName?: true
    lastName?: true
    username?: true
    isVerified?: true
    isActive?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    externalId?: true
    provider?: true
    email?: true
    phone?: true
    phoneKey?: true
    firstName?: true
    lastName?: true
    username?: true
    isVerified?: true
    isActive?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    externalId: string | null
    provider: string | null
    email: string | null
    phone: string | null
    phoneKey: string | null
    firstName: string
    lastName: string
    username: string
    isVerified: boolean
    isActive: boolean
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
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


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    provider?: boolean
    email?: boolean
    phone?: boolean
    phoneKey?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    isVerified?: boolean
    isActive?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    externalId?: boolean
    provider?: boolean
    email?: boolean
    phone?: boolean
    phoneKey?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    isVerified?: boolean
    isActive?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "provider" | "email" | "phone" | "phoneKey" | "firstName" | "lastName" | "username" | "isVerified" | "isActive" | "role" | "createdAt" | "updatedAt" | "lastLogin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$CreatorProfilePayload<ExtArgs> | null
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalId: string | null
      provider: string | null
      email: string | null
      phone: string | null
      phoneKey: string | null
      firstName: string
      lastName: string
      username: string
      isVerified: boolean
      isActive: boolean
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
      lastLogin: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
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
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly externalId: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly phoneKey: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    where?: CreatorProfileWhereInput
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CreatorProfile
   */

  export type AggregateCreatorProfile = {
    _count: CreatorProfileCountAggregateOutputType | null
    _avg: CreatorProfileAvgAggregateOutputType | null
    _sum: CreatorProfileSumAggregateOutputType | null
    _min: CreatorProfileMinAggregateOutputType | null
    _max: CreatorProfileMaxAggregateOutputType | null
  }

  export type CreatorProfileAvgAggregateOutputType = {
    followers: number | null
    totalPoints: number | null
    levelProgress: number | null
    streamCount: number | null
    shortCount: number | null
    reelCount: number | null
    totalReach: number | null
    totalViews: number | null
    cohortMonth: number | null
  }

  export type CreatorProfileSumAggregateOutputType = {
    followers: number | null
    totalPoints: number | null
    levelProgress: number | null
    streamCount: number | null
    shortCount: number | null
    reelCount: number | null
    totalReach: number | null
    totalViews: number | null
    cohortMonth: number | null
  }

  export type CreatorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    channelLogo: string | null
    contentType: string | null
    socialMediaLink: string | null
    followers: number | null
    eventAttendance: $Enums.EventAttendance | null
    whyJoin: string | null
    isApproved: boolean | null
    isActive: boolean | null
    totalPoints: number | null
    currentLevel: $Enums.CreatorLevel | null
    levelProgress: number | null
    rank: $Enums.Rank | null
    streamCount: number | null
    shortCount: number | null
    reelCount: number | null
    totalReach: number | null
    totalViews: number | null
    cohortMonth: number | null
    joinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    channelLogo: string | null
    contentType: string | null
    socialMediaLink: string | null
    followers: number | null
    eventAttendance: $Enums.EventAttendance | null
    whyJoin: string | null
    isApproved: boolean | null
    isActive: boolean | null
    totalPoints: number | null
    currentLevel: $Enums.CreatorLevel | null
    levelProgress: number | null
    rank: $Enums.Rank | null
    streamCount: number | null
    shortCount: number | null
    reelCount: number | null
    totalReach: number | null
    totalViews: number | null
    cohortMonth: number | null
    joinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorProfileCountAggregateOutputType = {
    id: number
    userId: number
    channelLogo: number
    platforms: number
    contentType: number
    socialMediaLink: number
    followers: number
    eventAttendance: number
    discoverySources: number
    whyJoin: number
    isApproved: number
    isActive: number
    totalPoints: number
    currentLevel: number
    levelProgress: number
    rank: number
    streamCount: number
    shortCount: number
    reelCount: number
    totalReach: number
    totalViews: number
    cohortMonth: number
    joinedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreatorProfileAvgAggregateInputType = {
    followers?: true
    totalPoints?: true
    levelProgress?: true
    streamCount?: true
    shortCount?: true
    reelCount?: true
    totalReach?: true
    totalViews?: true
    cohortMonth?: true
  }

  export type CreatorProfileSumAggregateInputType = {
    followers?: true
    totalPoints?: true
    levelProgress?: true
    streamCount?: true
    shortCount?: true
    reelCount?: true
    totalReach?: true
    totalViews?: true
    cohortMonth?: true
  }

  export type CreatorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    channelLogo?: true
    contentType?: true
    socialMediaLink?: true
    followers?: true
    eventAttendance?: true
    whyJoin?: true
    isApproved?: true
    isActive?: true
    totalPoints?: true
    currentLevel?: true
    levelProgress?: true
    rank?: true
    streamCount?: true
    shortCount?: true
    reelCount?: true
    totalReach?: true
    totalViews?: true
    cohortMonth?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    channelLogo?: true
    contentType?: true
    socialMediaLink?: true
    followers?: true
    eventAttendance?: true
    whyJoin?: true
    isApproved?: true
    isActive?: true
    totalPoints?: true
    currentLevel?: true
    levelProgress?: true
    rank?: true
    streamCount?: true
    shortCount?: true
    reelCount?: true
    totalReach?: true
    totalViews?: true
    cohortMonth?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreatorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    channelLogo?: true
    platforms?: true
    contentType?: true
    socialMediaLink?: true
    followers?: true
    eventAttendance?: true
    discoverySources?: true
    whyJoin?: true
    isApproved?: true
    isActive?: true
    totalPoints?: true
    currentLevel?: true
    levelProgress?: true
    rank?: true
    streamCount?: true
    shortCount?: true
    reelCount?: true
    totalReach?: true
    totalViews?: true
    cohortMonth?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreatorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorProfile to aggregate.
     */
    where?: CreatorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorProfiles to fetch.
     */
    orderBy?: CreatorProfileOrderByWithRelationInput | CreatorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorProfiles
    **/
    _count?: true | CreatorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreatorProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreatorProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorProfileMaxAggregateInputType
  }

  export type GetCreatorProfileAggregateType<T extends CreatorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorProfile[P]>
      : GetScalarType<T[P], AggregateCreatorProfile[P]>
  }




  export type CreatorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorProfileWhereInput
    orderBy?: CreatorProfileOrderByWithAggregationInput | CreatorProfileOrderByWithAggregationInput[]
    by: CreatorProfileScalarFieldEnum[] | CreatorProfileScalarFieldEnum
    having?: CreatorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorProfileCountAggregateInputType | true
    _avg?: CreatorProfileAvgAggregateInputType
    _sum?: CreatorProfileSumAggregateInputType
    _min?: CreatorProfileMinAggregateInputType
    _max?: CreatorProfileMaxAggregateInputType
  }

  export type CreatorProfileGroupByOutputType = {
    id: string
    userId: string
    channelLogo: string | null
    platforms: $Enums.Platform[]
    contentType: string
    socialMediaLink: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources: $Enums.DiscoverySource[]
    whyJoin: string
    isApproved: boolean
    isActive: boolean
    totalPoints: number
    currentLevel: $Enums.CreatorLevel
    levelProgress: number
    rank: $Enums.Rank
    streamCount: number
    shortCount: number
    reelCount: number
    totalReach: number
    totalViews: number
    cohortMonth: number | null
    joinedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CreatorProfileCountAggregateOutputType | null
    _avg: CreatorProfileAvgAggregateOutputType | null
    _sum: CreatorProfileSumAggregateOutputType | null
    _min: CreatorProfileMinAggregateOutputType | null
    _max: CreatorProfileMaxAggregateOutputType | null
  }

  type GetCreatorProfileGroupByPayload<T extends CreatorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorProfileGroupByOutputType[P]>
        }
      >
    >


  export type CreatorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelLogo?: boolean
    platforms?: boolean
    contentType?: boolean
    socialMediaLink?: boolean
    followers?: boolean
    eventAttendance?: boolean
    discoverySources?: boolean
    whyJoin?: boolean
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: boolean
    currentLevel?: boolean
    levelProgress?: boolean
    rank?: boolean
    streamCount?: boolean
    shortCount?: boolean
    reelCount?: boolean
    totalReach?: boolean
    totalViews?: boolean
    cohortMonth?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorProfile"]>



  export type CreatorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    channelLogo?: boolean
    platforms?: boolean
    contentType?: boolean
    socialMediaLink?: boolean
    followers?: boolean
    eventAttendance?: boolean
    discoverySources?: boolean
    whyJoin?: boolean
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: boolean
    currentLevel?: boolean
    levelProgress?: boolean
    rank?: boolean
    streamCount?: boolean
    shortCount?: boolean
    reelCount?: boolean
    totalReach?: boolean
    totalViews?: boolean
    cohortMonth?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreatorProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "channelLogo" | "platforms" | "contentType" | "socialMediaLink" | "followers" | "eventAttendance" | "discoverySources" | "whyJoin" | "isApproved" | "isActive" | "totalPoints" | "currentLevel" | "levelProgress" | "rank" | "streamCount" | "shortCount" | "reelCount" | "totalReach" | "totalViews" | "cohortMonth" | "joinedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["creatorProfile"]>
  export type CreatorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CreatorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      channelLogo: string | null
      platforms: $Enums.Platform[]
      contentType: string
      socialMediaLink: string
      followers: number
      eventAttendance: $Enums.EventAttendance
      discoverySources: $Enums.DiscoverySource[]
      whyJoin: string
      isApproved: boolean
      isActive: boolean
      totalPoints: number
      currentLevel: $Enums.CreatorLevel
      levelProgress: number
      rank: $Enums.Rank
      streamCount: number
      shortCount: number
      reelCount: number
      totalReach: number
      totalViews: number
      cohortMonth: number | null
      joinedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creatorProfile"]>
    composites: {}
  }

  type CreatorProfileGetPayload<S extends boolean | null | undefined | CreatorProfileDefaultArgs> = $Result.GetResult<Prisma.$CreatorProfilePayload, S>

  type CreatorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreatorProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreatorProfileCountAggregateInputType | true
    }

  export interface CreatorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorProfile'], meta: { name: 'CreatorProfile' } }
    /**
     * Find zero or one CreatorProfile that matches the filter.
     * @param {CreatorProfileFindUniqueArgs} args - Arguments to find a CreatorProfile
     * @example
     * // Get one CreatorProfile
     * const creatorProfile = await prisma.creatorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreatorProfileFindUniqueArgs>(args: SelectSubset<T, CreatorProfileFindUniqueArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreatorProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreatorProfileFindUniqueOrThrowArgs} args - Arguments to find a CreatorProfile
     * @example
     * // Get one CreatorProfile
     * const creatorProfile = await prisma.creatorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreatorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, CreatorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileFindFirstArgs} args - Arguments to find a CreatorProfile
     * @example
     * // Get one CreatorProfile
     * const creatorProfile = await prisma.creatorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreatorProfileFindFirstArgs>(args?: SelectSubset<T, CreatorProfileFindFirstArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreatorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileFindFirstOrThrowArgs} args - Arguments to find a CreatorProfile
     * @example
     * // Get one CreatorProfile
     * const creatorProfile = await prisma.creatorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreatorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, CreatorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorProfiles
     * const creatorProfiles = await prisma.creatorProfile.findMany()
     * 
     * // Get first 10 CreatorProfiles
     * const creatorProfiles = await prisma.creatorProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorProfileWithIdOnly = await prisma.creatorProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreatorProfileFindManyArgs>(args?: SelectSubset<T, CreatorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreatorProfile.
     * @param {CreatorProfileCreateArgs} args - Arguments to create a CreatorProfile.
     * @example
     * // Create one CreatorProfile
     * const CreatorProfile = await prisma.creatorProfile.create({
     *   data: {
     *     // ... data to create a CreatorProfile
     *   }
     * })
     * 
     */
    create<T extends CreatorProfileCreateArgs>(args: SelectSubset<T, CreatorProfileCreateArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreatorProfiles.
     * @param {CreatorProfileCreateManyArgs} args - Arguments to create many CreatorProfiles.
     * @example
     * // Create many CreatorProfiles
     * const creatorProfile = await prisma.creatorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreatorProfileCreateManyArgs>(args?: SelectSubset<T, CreatorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CreatorProfile.
     * @param {CreatorProfileDeleteArgs} args - Arguments to delete one CreatorProfile.
     * @example
     * // Delete one CreatorProfile
     * const CreatorProfile = await prisma.creatorProfile.delete({
     *   where: {
     *     // ... filter to delete one CreatorProfile
     *   }
     * })
     * 
     */
    delete<T extends CreatorProfileDeleteArgs>(args: SelectSubset<T, CreatorProfileDeleteArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreatorProfile.
     * @param {CreatorProfileUpdateArgs} args - Arguments to update one CreatorProfile.
     * @example
     * // Update one CreatorProfile
     * const creatorProfile = await prisma.creatorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreatorProfileUpdateArgs>(args: SelectSubset<T, CreatorProfileUpdateArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreatorProfiles.
     * @param {CreatorProfileDeleteManyArgs} args - Arguments to filter CreatorProfiles to delete.
     * @example
     * // Delete a few CreatorProfiles
     * const { count } = await prisma.creatorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreatorProfileDeleteManyArgs>(args?: SelectSubset<T, CreatorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorProfiles
     * const creatorProfile = await prisma.creatorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreatorProfileUpdateManyArgs>(args: SelectSubset<T, CreatorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CreatorProfile.
     * @param {CreatorProfileUpsertArgs} args - Arguments to update or create a CreatorProfile.
     * @example
     * // Update or create a CreatorProfile
     * const creatorProfile = await prisma.creatorProfile.upsert({
     *   create: {
     *     // ... data to create a CreatorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorProfile we want to update
     *   }
     * })
     */
    upsert<T extends CreatorProfileUpsertArgs>(args: SelectSubset<T, CreatorProfileUpsertArgs<ExtArgs>>): Prisma__CreatorProfileClient<$Result.GetResult<Prisma.$CreatorProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreatorProfiles that matches the filter.
     * @param {CreatorProfileFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const creatorProfile = await prisma.creatorProfile.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CreatorProfileFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CreatorProfile.
     * @param {CreatorProfileAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const creatorProfile = await prisma.creatorProfile.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CreatorProfileAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CreatorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileCountArgs} args - Arguments to filter CreatorProfiles to count.
     * @example
     * // Count the number of CreatorProfiles
     * const count = await prisma.creatorProfile.count({
     *   where: {
     *     // ... the filter for the CreatorProfiles we want to count
     *   }
     * })
    **/
    count<T extends CreatorProfileCountArgs>(
      args?: Subset<T, CreatorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CreatorProfileAggregateArgs>(args: Subset<T, CreatorProfileAggregateArgs>): Prisma.PrismaPromise<GetCreatorProfileAggregateType<T>>

    /**
     * Group by CreatorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorProfileGroupByArgs} args - Group by arguments.
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
      T extends CreatorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorProfileGroupByArgs['orderBy'] }
        : { orderBy?: CreatorProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CreatorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorProfile model
   */
  readonly fields: CreatorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CreatorProfile model
   */
  interface CreatorProfileFieldRefs {
    readonly id: FieldRef<"CreatorProfile", 'String'>
    readonly userId: FieldRef<"CreatorProfile", 'String'>
    readonly channelLogo: FieldRef<"CreatorProfile", 'String'>
    readonly platforms: FieldRef<"CreatorProfile", 'Platform[]'>
    readonly contentType: FieldRef<"CreatorProfile", 'String'>
    readonly socialMediaLink: FieldRef<"CreatorProfile", 'String'>
    readonly followers: FieldRef<"CreatorProfile", 'Int'>
    readonly eventAttendance: FieldRef<"CreatorProfile", 'EventAttendance'>
    readonly discoverySources: FieldRef<"CreatorProfile", 'DiscoverySource[]'>
    readonly whyJoin: FieldRef<"CreatorProfile", 'String'>
    readonly isApproved: FieldRef<"CreatorProfile", 'Boolean'>
    readonly isActive: FieldRef<"CreatorProfile", 'Boolean'>
    readonly totalPoints: FieldRef<"CreatorProfile", 'Int'>
    readonly currentLevel: FieldRef<"CreatorProfile", 'CreatorLevel'>
    readonly levelProgress: FieldRef<"CreatorProfile", 'Float'>
    readonly rank: FieldRef<"CreatorProfile", 'Rank'>
    readonly streamCount: FieldRef<"CreatorProfile", 'Int'>
    readonly shortCount: FieldRef<"CreatorProfile", 'Int'>
    readonly reelCount: FieldRef<"CreatorProfile", 'Int'>
    readonly totalReach: FieldRef<"CreatorProfile", 'Int'>
    readonly totalViews: FieldRef<"CreatorProfile", 'Int'>
    readonly cohortMonth: FieldRef<"CreatorProfile", 'Int'>
    readonly joinedAt: FieldRef<"CreatorProfile", 'DateTime'>
    readonly createdAt: FieldRef<"CreatorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"CreatorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreatorProfile findUnique
   */
  export type CreatorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * Filter, which CreatorProfile to fetch.
     */
    where: CreatorProfileWhereUniqueInput
  }

  /**
   * CreatorProfile findUniqueOrThrow
   */
  export type CreatorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * Filter, which CreatorProfile to fetch.
     */
    where: CreatorProfileWhereUniqueInput
  }

  /**
   * CreatorProfile findFirst
   */
  export type CreatorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * Filter, which CreatorProfile to fetch.
     */
    where?: CreatorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorProfiles to fetch.
     */
    orderBy?: CreatorProfileOrderByWithRelationInput | CreatorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorProfiles.
     */
    cursor?: CreatorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorProfiles.
     */
    distinct?: CreatorProfileScalarFieldEnum | CreatorProfileScalarFieldEnum[]
  }

  /**
   * CreatorProfile findFirstOrThrow
   */
  export type CreatorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * Filter, which CreatorProfile to fetch.
     */
    where?: CreatorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorProfiles to fetch.
     */
    orderBy?: CreatorProfileOrderByWithRelationInput | CreatorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorProfiles.
     */
    cursor?: CreatorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorProfiles.
     */
    distinct?: CreatorProfileScalarFieldEnum | CreatorProfileScalarFieldEnum[]
  }

  /**
   * CreatorProfile findMany
   */
  export type CreatorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * Filter, which CreatorProfiles to fetch.
     */
    where?: CreatorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorProfiles to fetch.
     */
    orderBy?: CreatorProfileOrderByWithRelationInput | CreatorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorProfiles.
     */
    cursor?: CreatorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorProfiles.
     */
    skip?: number
    distinct?: CreatorProfileScalarFieldEnum | CreatorProfileScalarFieldEnum[]
  }

  /**
   * CreatorProfile create
   */
  export type CreatorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorProfile.
     */
    data: XOR<CreatorProfileCreateInput, CreatorProfileUncheckedCreateInput>
  }

  /**
   * CreatorProfile createMany
   */
  export type CreatorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorProfiles.
     */
    data: CreatorProfileCreateManyInput | CreatorProfileCreateManyInput[]
  }

  /**
   * CreatorProfile update
   */
  export type CreatorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorProfile.
     */
    data: XOR<CreatorProfileUpdateInput, CreatorProfileUncheckedUpdateInput>
    /**
     * Choose, which CreatorProfile to update.
     */
    where: CreatorProfileWhereUniqueInput
  }

  /**
   * CreatorProfile updateMany
   */
  export type CreatorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorProfiles.
     */
    data: XOR<CreatorProfileUpdateManyMutationInput, CreatorProfileUncheckedUpdateManyInput>
    /**
     * Filter which CreatorProfiles to update
     */
    where?: CreatorProfileWhereInput
    /**
     * Limit how many CreatorProfiles to update.
     */
    limit?: number
  }

  /**
   * CreatorProfile upsert
   */
  export type CreatorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorProfile to update in case it exists.
     */
    where: CreatorProfileWhereUniqueInput
    /**
     * In case the CreatorProfile found by the `where` argument doesn't exist, create a new CreatorProfile with this data.
     */
    create: XOR<CreatorProfileCreateInput, CreatorProfileUncheckedCreateInput>
    /**
     * In case the CreatorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorProfileUpdateInput, CreatorProfileUncheckedUpdateInput>
  }

  /**
   * CreatorProfile delete
   */
  export type CreatorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
    /**
     * Filter which CreatorProfile to delete.
     */
    where: CreatorProfileWhereUniqueInput
  }

  /**
   * CreatorProfile deleteMany
   */
  export type CreatorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorProfiles to delete
     */
    where?: CreatorProfileWhereInput
    /**
     * Limit how many CreatorProfiles to delete.
     */
    limit?: number
  }

  /**
   * CreatorProfile findRaw
   */
  export type CreatorProfileFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CreatorProfile aggregateRaw
   */
  export type CreatorProfileAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CreatorProfile without action
   */
  export type CreatorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorProfile
     */
    select?: CreatorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreatorProfile
     */
    omit?: CreatorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreatorProfileInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    totalReach: number | null
    totalViews: number | null
    pointsAwarded: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    totalReach: number | null
    totalViews: number | null
    pointsAwarded: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    rank: $Enums.Rank | null
    platform: $Enums.Platform | null
    contentLink: string | null
    totalReach: number | null
    totalViews: number | null
    statsScreenshotUrl: string | null
    pointsAwarded: number | null
    adminNotes: string | null
    submittedByAdminId: string | null
    isApproved: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    rank: $Enums.Rank | null
    platform: $Enums.Platform | null
    contentLink: string | null
    totalReach: number | null
    totalViews: number | null
    statsScreenshotUrl: string | null
    pointsAwarded: number | null
    adminNotes: string | null
    submittedByAdminId: string | null
    isApproved: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    userId: number
    rank: number
    platform: number
    contentLink: number
    contentTypes: number
    monsterAppearances: number
    totalReach: number
    totalViews: number
    statsScreenshotUrl: number
    pointsAwarded: number
    adminNotes: number
    submittedByAdminId: number
    isApproved: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    totalReach?: true
    totalViews?: true
    pointsAwarded?: true
  }

  export type SubmissionSumAggregateInputType = {
    totalReach?: true
    totalViews?: true
    pointsAwarded?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    userId?: true
    rank?: true
    platform?: true
    contentLink?: true
    totalReach?: true
    totalViews?: true
    statsScreenshotUrl?: true
    pointsAwarded?: true
    adminNotes?: true
    submittedByAdminId?: true
    isApproved?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    userId?: true
    rank?: true
    platform?: true
    contentLink?: true
    totalReach?: true
    totalViews?: true
    statsScreenshotUrl?: true
    pointsAwarded?: true
    adminNotes?: true
    submittedByAdminId?: true
    isApproved?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    userId?: true
    rank?: true
    platform?: true
    contentLink?: true
    contentTypes?: true
    monsterAppearances?: true
    totalReach?: true
    totalViews?: true
    statsScreenshotUrl?: true
    pointsAwarded?: true
    adminNotes?: true
    submittedByAdminId?: true
    isApproved?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    userId: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes: $Enums.ContentType[]
    monsterAppearances: $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl: string | null
    pointsAwarded: number
    adminNotes: string | null
    submittedByAdminId: string | null
    isApproved: boolean
    createdAt: Date
    updatedAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rank?: boolean
    platform?: boolean
    contentLink?: boolean
    contentTypes?: boolean
    monsterAppearances?: boolean
    totalReach?: boolean
    totalViews?: boolean
    statsScreenshotUrl?: boolean
    pointsAwarded?: boolean
    adminNotes?: boolean
    submittedByAdminId?: boolean
    isApproved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>



  export type SubmissionSelectScalar = {
    id?: boolean
    userId?: boolean
    rank?: boolean
    platform?: boolean
    contentLink?: boolean
    contentTypes?: boolean
    monsterAppearances?: boolean
    totalReach?: boolean
    totalViews?: boolean
    statsScreenshotUrl?: boolean
    pointsAwarded?: boolean
    adminNotes?: boolean
    submittedByAdminId?: boolean
    isApproved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "rank" | "platform" | "contentLink" | "contentTypes" | "monsterAppearances" | "totalReach" | "totalViews" | "statsScreenshotUrl" | "pointsAwarded" | "adminNotes" | "submittedByAdminId" | "isApproved" | "createdAt" | "updatedAt", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      rank: $Enums.Rank
      platform: $Enums.Platform
      contentLink: string
      contentTypes: $Enums.ContentType[]
      monsterAppearances: $Enums.MonsterAppearance[]
      totalReach: number
      totalViews: number
      statsScreenshotUrl: string | null
      pointsAwarded: number
      adminNotes: string | null
      submittedByAdminId: string | null
      isApproved: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * @param {SubmissionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const submission = await prisma.submission.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SubmissionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Submission.
     * @param {SubmissionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const submission = await prisma.submission.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SubmissionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
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
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly userId: FieldRef<"Submission", 'String'>
    readonly rank: FieldRef<"Submission", 'Rank'>
    readonly platform: FieldRef<"Submission", 'Platform'>
    readonly contentLink: FieldRef<"Submission", 'String'>
    readonly contentTypes: FieldRef<"Submission", 'ContentType[]'>
    readonly monsterAppearances: FieldRef<"Submission", 'MonsterAppearance[]'>
    readonly totalReach: FieldRef<"Submission", 'Int'>
    readonly totalViews: FieldRef<"Submission", 'Int'>
    readonly statsScreenshotUrl: FieldRef<"Submission", 'String'>
    readonly pointsAwarded: FieldRef<"Submission", 'Int'>
    readonly adminNotes: FieldRef<"Submission", 'String'>
    readonly submittedByAdminId: FieldRef<"Submission", 'String'>
    readonly isApproved: FieldRef<"Submission", 'Boolean'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly updatedAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission findRaw
   */
  export type SubmissionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Submission aggregateRaw
   */
  export type SubmissionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    provider: 'provider',
    email: 'email',
    phone: 'phone',
    phoneKey: 'phoneKey',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    isVerified: 'isVerified',
    isActive: 'isActive',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLogin: 'lastLogin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CreatorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    channelLogo: 'channelLogo',
    platforms: 'platforms',
    contentType: 'contentType',
    socialMediaLink: 'socialMediaLink',
    followers: 'followers',
    eventAttendance: 'eventAttendance',
    discoverySources: 'discoverySources',
    whyJoin: 'whyJoin',
    isApproved: 'isApproved',
    isActive: 'isActive',
    totalPoints: 'totalPoints',
    currentLevel: 'currentLevel',
    levelProgress: 'levelProgress',
    rank: 'rank',
    streamCount: 'streamCount',
    shortCount: 'shortCount',
    reelCount: 'reelCount',
    totalReach: 'totalReach',
    totalViews: 'totalViews',
    cohortMonth: 'cohortMonth',
    joinedAt: 'joinedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreatorProfileScalarFieldEnum = (typeof CreatorProfileScalarFieldEnum)[keyof typeof CreatorProfileScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    rank: 'rank',
    platform: 'platform',
    contentLink: 'contentLink',
    contentTypes: 'contentTypes',
    monsterAppearances: 'monsterAppearances',
    totalReach: 'totalReach',
    totalViews: 'totalViews',
    statsScreenshotUrl: 'statsScreenshotUrl',
    pointsAwarded: 'pointsAwarded',
    adminNotes: 'adminNotes',
    submittedByAdminId: 'submittedByAdminId',
    isApproved: 'isApproved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Platform[]'
   */
  export type ListEnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform[]'>
    


  /**
   * Reference to a field of type 'Platform'
   */
  export type EnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EventAttendance'
   */
  export type EnumEventAttendanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventAttendance'>
    


  /**
   * Reference to a field of type 'EventAttendance[]'
   */
  export type ListEnumEventAttendanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventAttendance[]'>
    


  /**
   * Reference to a field of type 'DiscoverySource[]'
   */
  export type ListEnumDiscoverySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscoverySource[]'>
    


  /**
   * Reference to a field of type 'DiscoverySource'
   */
  export type EnumDiscoverySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscoverySource'>
    


  /**
   * Reference to a field of type 'CreatorLevel'
   */
  export type EnumCreatorLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreatorLevel'>
    


  /**
   * Reference to a field of type 'CreatorLevel[]'
   */
  export type ListEnumCreatorLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreatorLevel[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Rank'
   */
  export type EnumRankFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rank'>
    


  /**
   * Reference to a field of type 'Rank[]'
   */
  export type ListEnumRankFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rank[]'>
    


  /**
   * Reference to a field of type 'ContentType[]'
   */
  export type ListEnumContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentType[]'>
    


  /**
   * Reference to a field of type 'ContentType'
   */
  export type EnumContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentType'>
    


  /**
   * Reference to a field of type 'MonsterAppearance[]'
   */
  export type ListEnumMonsterAppearanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MonsterAppearance[]'>
    


  /**
   * Reference to a field of type 'MonsterAppearance'
   */
  export type EnumMonsterAppearanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MonsterAppearance'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    externalId?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    phoneKey?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    profile?: XOR<CreatorProfileNullableScalarRelationFilter, CreatorProfileWhereInput> | null
    submissions?: SubmissionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    profile?: CreatorProfileOrderByWithRelationInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    provider?: StringNullableFilter<"User"> | string | null
    phoneKey?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    profile?: XOR<CreatorProfileNullableScalarRelationFilter, CreatorProfileWhereInput> | null
    submissions?: SubmissionListRelationFilter
  }, "id" | "unique_email" | "unique_phone" | "unique_external_id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    externalId?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CreatorProfileWhereInput = {
    AND?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    OR?: CreatorProfileWhereInput[]
    NOT?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    id?: StringFilter<"CreatorProfile"> | string
    userId?: StringFilter<"CreatorProfile"> | string
    channelLogo?: StringNullableFilter<"CreatorProfile"> | string | null
    platforms?: EnumPlatformNullableListFilter<"CreatorProfile">
    contentType?: StringFilter<"CreatorProfile"> | string
    socialMediaLink?: StringFilter<"CreatorProfile"> | string
    followers?: IntFilter<"CreatorProfile"> | number
    eventAttendance?: EnumEventAttendanceFilter<"CreatorProfile"> | $Enums.EventAttendance
    discoverySources?: EnumDiscoverySourceNullableListFilter<"CreatorProfile">
    whyJoin?: StringFilter<"CreatorProfile"> | string
    isApproved?: BoolFilter<"CreatorProfile"> | boolean
    isActive?: BoolFilter<"CreatorProfile"> | boolean
    totalPoints?: IntFilter<"CreatorProfile"> | number
    currentLevel?: EnumCreatorLevelFilter<"CreatorProfile"> | $Enums.CreatorLevel
    levelProgress?: FloatFilter<"CreatorProfile"> | number
    rank?: EnumRankFilter<"CreatorProfile"> | $Enums.Rank
    streamCount?: IntFilter<"CreatorProfile"> | number
    shortCount?: IntFilter<"CreatorProfile"> | number
    reelCount?: IntFilter<"CreatorProfile"> | number
    totalReach?: IntFilter<"CreatorProfile"> | number
    totalViews?: IntFilter<"CreatorProfile"> | number
    cohortMonth?: IntNullableFilter<"CreatorProfile"> | number | null
    joinedAt?: DateTimeNullableFilter<"CreatorProfile"> | Date | string | null
    createdAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CreatorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    channelLogo?: SortOrder
    platforms?: SortOrder
    contentType?: SortOrder
    socialMediaLink?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    discoverySources?: SortOrder
    whyJoin?: SortOrder
    isApproved?: SortOrder
    isActive?: SortOrder
    totalPoints?: SortOrder
    currentLevel?: SortOrder
    levelProgress?: SortOrder
    rank?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CreatorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    OR?: CreatorProfileWhereInput[]
    NOT?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    channelLogo?: StringNullableFilter<"CreatorProfile"> | string | null
    platforms?: EnumPlatformNullableListFilter<"CreatorProfile">
    contentType?: StringFilter<"CreatorProfile"> | string
    socialMediaLink?: StringFilter<"CreatorProfile"> | string
    followers?: IntFilter<"CreatorProfile"> | number
    eventAttendance?: EnumEventAttendanceFilter<"CreatorProfile"> | $Enums.EventAttendance
    discoverySources?: EnumDiscoverySourceNullableListFilter<"CreatorProfile">
    whyJoin?: StringFilter<"CreatorProfile"> | string
    isApproved?: BoolFilter<"CreatorProfile"> | boolean
    isActive?: BoolFilter<"CreatorProfile"> | boolean
    totalPoints?: IntFilter<"CreatorProfile"> | number
    currentLevel?: EnumCreatorLevelFilter<"CreatorProfile"> | $Enums.CreatorLevel
    levelProgress?: FloatFilter<"CreatorProfile"> | number
    rank?: EnumRankFilter<"CreatorProfile"> | $Enums.Rank
    streamCount?: IntFilter<"CreatorProfile"> | number
    shortCount?: IntFilter<"CreatorProfile"> | number
    reelCount?: IntFilter<"CreatorProfile"> | number
    totalReach?: IntFilter<"CreatorProfile"> | number
    totalViews?: IntFilter<"CreatorProfile"> | number
    cohortMonth?: IntNullableFilter<"CreatorProfile"> | number | null
    joinedAt?: DateTimeNullableFilter<"CreatorProfile"> | Date | string | null
    createdAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type CreatorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    channelLogo?: SortOrder
    platforms?: SortOrder
    contentType?: SortOrder
    socialMediaLink?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    discoverySources?: SortOrder
    whyJoin?: SortOrder
    isApproved?: SortOrder
    isActive?: SortOrder
    totalPoints?: SortOrder
    currentLevel?: SortOrder
    levelProgress?: SortOrder
    rank?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreatorProfileCountOrderByAggregateInput
    _avg?: CreatorProfileAvgOrderByAggregateInput
    _max?: CreatorProfileMaxOrderByAggregateInput
    _min?: CreatorProfileMinOrderByAggregateInput
    _sum?: CreatorProfileSumOrderByAggregateInput
  }

  export type CreatorProfileScalarWhereWithAggregatesInput = {
    AND?: CreatorProfileScalarWhereWithAggregatesInput | CreatorProfileScalarWhereWithAggregatesInput[]
    OR?: CreatorProfileScalarWhereWithAggregatesInput[]
    NOT?: CreatorProfileScalarWhereWithAggregatesInput | CreatorProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorProfile"> | string
    userId?: StringWithAggregatesFilter<"CreatorProfile"> | string
    channelLogo?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    platforms?: EnumPlatformNullableListFilter<"CreatorProfile">
    contentType?: StringWithAggregatesFilter<"CreatorProfile"> | string
    socialMediaLink?: StringWithAggregatesFilter<"CreatorProfile"> | string
    followers?: IntWithAggregatesFilter<"CreatorProfile"> | number
    eventAttendance?: EnumEventAttendanceWithAggregatesFilter<"CreatorProfile"> | $Enums.EventAttendance
    discoverySources?: EnumDiscoverySourceNullableListFilter<"CreatorProfile">
    whyJoin?: StringWithAggregatesFilter<"CreatorProfile"> | string
    isApproved?: BoolWithAggregatesFilter<"CreatorProfile"> | boolean
    isActive?: BoolWithAggregatesFilter<"CreatorProfile"> | boolean
    totalPoints?: IntWithAggregatesFilter<"CreatorProfile"> | number
    currentLevel?: EnumCreatorLevelWithAggregatesFilter<"CreatorProfile"> | $Enums.CreatorLevel
    levelProgress?: FloatWithAggregatesFilter<"CreatorProfile"> | number
    rank?: EnumRankWithAggregatesFilter<"CreatorProfile"> | $Enums.Rank
    streamCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    shortCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    reelCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalReach?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalViews?: IntWithAggregatesFilter<"CreatorProfile"> | number
    cohortMonth?: IntNullableWithAggregatesFilter<"CreatorProfile"> | number | null
    joinedAt?: DateTimeNullableWithAggregatesFilter<"CreatorProfile"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreatorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreatorProfile"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    rank?: EnumRankFilter<"Submission"> | $Enums.Rank
    platform?: EnumPlatformFilter<"Submission"> | $Enums.Platform
    contentLink?: StringFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    totalReach?: IntFilter<"Submission"> | number
    totalViews?: IntFilter<"Submission"> | number
    statsScreenshotUrl?: StringNullableFilter<"Submission"> | string | null
    pointsAwarded?: IntFilter<"Submission"> | number
    adminNotes?: StringNullableFilter<"Submission"> | string | null
    submittedByAdminId?: StringNullableFilter<"Submission"> | string | null
    isApproved?: BoolFilter<"Submission"> | boolean
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    contentTypes?: SortOrder
    monsterAppearances?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    statsScreenshotUrl?: SortOrder
    pointsAwarded?: SortOrder
    adminNotes?: SortOrder
    submittedByAdminId?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    userId?: StringFilter<"Submission"> | string
    rank?: EnumRankFilter<"Submission"> | $Enums.Rank
    platform?: EnumPlatformFilter<"Submission"> | $Enums.Platform
    contentLink?: StringFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    totalReach?: IntFilter<"Submission"> | number
    totalViews?: IntFilter<"Submission"> | number
    statsScreenshotUrl?: StringNullableFilter<"Submission"> | string | null
    pointsAwarded?: IntFilter<"Submission"> | number
    adminNotes?: StringNullableFilter<"Submission"> | string | null
    submittedByAdminId?: StringNullableFilter<"Submission"> | string | null
    isApproved?: BoolFilter<"Submission"> | boolean
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    contentTypes?: SortOrder
    monsterAppearances?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    statsScreenshotUrl?: SortOrder
    pointsAwarded?: SortOrder
    adminNotes?: SortOrder
    submittedByAdminId?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    userId?: StringWithAggregatesFilter<"Submission"> | string
    rank?: EnumRankWithAggregatesFilter<"Submission"> | $Enums.Rank
    platform?: EnumPlatformWithAggregatesFilter<"Submission"> | $Enums.Platform
    contentLink?: StringWithAggregatesFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    totalReach?: IntWithAggregatesFilter<"Submission"> | number
    totalViews?: IntWithAggregatesFilter<"Submission"> | number
    statsScreenshotUrl?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    pointsAwarded?: IntWithAggregatesFilter<"Submission"> | number
    adminNotes?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    submittedByAdminId?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    isApproved?: BoolWithAggregatesFilter<"Submission"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    profile?: CreatorProfileCreateNestedOneWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    profile?: CreatorProfileUncheckedCreateNestedOneWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: CreatorProfileUpdateOneWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: CreatorProfileUncheckedUpdateOneWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CreatorProfileCreateInput = {
    id?: string
    channelLogo?: string | null
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    contentType: string
    socialMediaLink: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin: string
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: number
    currentLevel?: $Enums.CreatorLevel
    levelProgress?: number
    rank?: $Enums.Rank
    streamCount?: number
    shortCount?: number
    reelCount?: number
    totalReach?: number
    totalViews?: number
    cohortMonth?: number | null
    joinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type CreatorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    channelLogo?: string | null
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    contentType: string
    socialMediaLink: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin: string
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: number
    currentLevel?: $Enums.CreatorLevel
    levelProgress?: number
    rank?: $Enums.Rank
    streamCount?: number
    shortCount?: number
    reelCount?: number
    totalReach?: number
    totalViews?: number
    cohortMonth?: number | null
    joinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileUpdateInput = {
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    contentType?: StringFieldUpdateOperationsInput | string
    socialMediaLink?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalPoints?: IntFieldUpdateOperationsInput | number
    currentLevel?: EnumCreatorLevelFieldUpdateOperationsInput | $Enums.CreatorLevel
    levelProgress?: FloatFieldUpdateOperationsInput | number
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    streamCount?: IntFieldUpdateOperationsInput | number
    shortCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    cohortMonth?: NullableIntFieldUpdateOperationsInput | number | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type CreatorProfileUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    contentType?: StringFieldUpdateOperationsInput | string
    socialMediaLink?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalPoints?: IntFieldUpdateOperationsInput | number
    currentLevel?: EnumCreatorLevelFieldUpdateOperationsInput | $Enums.CreatorLevel
    levelProgress?: FloatFieldUpdateOperationsInput | number
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    streamCount?: IntFieldUpdateOperationsInput | number
    shortCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    cohortMonth?: NullableIntFieldUpdateOperationsInput | number | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileCreateManyInput = {
    id?: string
    userId: string
    channelLogo?: string | null
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    contentType: string
    socialMediaLink: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin: string
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: number
    currentLevel?: $Enums.CreatorLevel
    levelProgress?: number
    rank?: $Enums.Rank
    streamCount?: number
    shortCount?: number
    reelCount?: number
    totalReach?: number
    totalViews?: number
    cohortMonth?: number | null
    joinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileUpdateManyMutationInput = {
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    contentType?: StringFieldUpdateOperationsInput | string
    socialMediaLink?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalPoints?: IntFieldUpdateOperationsInput | number
    currentLevel?: EnumCreatorLevelFieldUpdateOperationsInput | $Enums.CreatorLevel
    levelProgress?: FloatFieldUpdateOperationsInput | number
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    streamCount?: IntFieldUpdateOperationsInput | number
    shortCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    cohortMonth?: NullableIntFieldUpdateOperationsInput | number | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    contentType?: StringFieldUpdateOperationsInput | string
    socialMediaLink?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalPoints?: IntFieldUpdateOperationsInput | number
    currentLevel?: EnumCreatorLevelFieldUpdateOperationsInput | $Enums.CreatorLevel
    levelProgress?: FloatFieldUpdateOperationsInput | number
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    streamCount?: IntFieldUpdateOperationsInput | number
    shortCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    cohortMonth?: NullableIntFieldUpdateOperationsInput | number | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    id?: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl?: string | null
    pointsAwarded?: number
    adminNotes?: string | null
    submittedByAdminId?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    userId: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl?: string | null
    pointsAwarded?: number
    adminNotes?: string | null
    submittedByAdminId?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateInput = {
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyInput = {
    id?: string
    userId: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl?: string | null
    pointsAwarded?: number
    adminNotes?: string | null
    submittedByAdminId?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type CreatorProfileNullableScalarRelationFilter = {
    is?: CreatorProfileWhereInput | null
    isNot?: CreatorProfileWhereInput | null
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumPlatformNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel> | null
    has?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumEventAttendanceFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendance | EnumEventAttendanceFieldRefInput<$PrismaModel>
    in?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    not?: NestedEnumEventAttendanceFilter<$PrismaModel> | $Enums.EventAttendance
  }

  export type EnumDiscoverySourceNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscoverySource[] | ListEnumDiscoverySourceFieldRefInput<$PrismaModel> | null
    has?: $Enums.DiscoverySource | EnumDiscoverySourceFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.DiscoverySource[] | ListEnumDiscoverySourceFieldRefInput<$PrismaModel>
    hasSome?: $Enums.DiscoverySource[] | ListEnumDiscoverySourceFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumCreatorLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorLevel | EnumCreatorLevelFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorLevelFilter<$PrismaModel> | $Enums.CreatorLevel
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumRankFilter<$PrismaModel = never> = {
    equals?: $Enums.Rank | EnumRankFieldRefInput<$PrismaModel>
    in?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    not?: NestedEnumRankFilter<$PrismaModel> | $Enums.Rank
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CreatorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelLogo?: SortOrder
    platforms?: SortOrder
    contentType?: SortOrder
    socialMediaLink?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    discoverySources?: SortOrder
    whyJoin?: SortOrder
    isApproved?: SortOrder
    isActive?: SortOrder
    totalPoints?: SortOrder
    currentLevel?: SortOrder
    levelProgress?: SortOrder
    rank?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorProfileAvgOrderByAggregateInput = {
    followers?: SortOrder
    totalPoints?: SortOrder
    levelProgress?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
  }

  export type CreatorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    socialMediaLink?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    whyJoin?: SortOrder
    isApproved?: SortOrder
    isActive?: SortOrder
    totalPoints?: SortOrder
    currentLevel?: SortOrder
    levelProgress?: SortOrder
    rank?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    socialMediaLink?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    whyJoin?: SortOrder
    isApproved?: SortOrder
    isActive?: SortOrder
    totalPoints?: SortOrder
    currentLevel?: SortOrder
    levelProgress?: SortOrder
    rank?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorProfileSumOrderByAggregateInput = {
    followers?: SortOrder
    totalPoints?: SortOrder
    levelProgress?: SortOrder
    streamCount?: SortOrder
    shortCount?: SortOrder
    reelCount?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    cohortMonth?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumEventAttendanceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendance | EnumEventAttendanceFieldRefInput<$PrismaModel>
    in?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    not?: NestedEnumEventAttendanceWithAggregatesFilter<$PrismaModel> | $Enums.EventAttendance
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventAttendanceFilter<$PrismaModel>
    _max?: NestedEnumEventAttendanceFilter<$PrismaModel>
  }

  export type EnumCreatorLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorLevel | EnumCreatorLevelFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorLevelWithAggregatesFilter<$PrismaModel> | $Enums.CreatorLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreatorLevelFilter<$PrismaModel>
    _max?: NestedEnumCreatorLevelFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumRankWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rank | EnumRankFieldRefInput<$PrismaModel>
    in?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    not?: NestedEnumRankWithAggregatesFilter<$PrismaModel> | $Enums.Rank
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRankFilter<$PrismaModel>
    _max?: NestedEnumRankFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type EnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type EnumContentTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel> | null
    has?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    hasSome?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumMonsterAppearanceNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.MonsterAppearance[] | ListEnumMonsterAppearanceFieldRefInput<$PrismaModel> | null
    has?: $Enums.MonsterAppearance | EnumMonsterAppearanceFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.MonsterAppearance[] | ListEnumMonsterAppearanceFieldRefInput<$PrismaModel>
    hasSome?: $Enums.MonsterAppearance[] | ListEnumMonsterAppearanceFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    contentTypes?: SortOrder
    monsterAppearances?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    statsScreenshotUrl?: SortOrder
    pointsAwarded?: SortOrder
    adminNotes?: SortOrder
    submittedByAdminId?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    totalReach?: SortOrder
    totalViews?: SortOrder
    pointsAwarded?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    statsScreenshotUrl?: SortOrder
    pointsAwarded?: SortOrder
    adminNotes?: SortOrder
    submittedByAdminId?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    totalReach?: SortOrder
    totalViews?: SortOrder
    statsScreenshotUrl?: SortOrder
    pointsAwarded?: SortOrder
    adminNotes?: SortOrder
    submittedByAdminId?: SortOrder
    isApproved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    totalReach?: SortOrder
    totalViews?: SortOrder
    pointsAwarded?: SortOrder
  }

  export type EnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type CreatorProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorProfileCreateOrConnectWithoutUserInput
    connect?: CreatorProfileWhereUniqueInput
  }

  export type SubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type CreatorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorProfileCreateOrConnectWithoutUserInput
    connect?: CreatorProfileWhereUniqueInput
  }

  export type SubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type CreatorProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorProfileCreateOrConnectWithoutUserInput
    upsert?: CreatorProfileUpsertWithoutUserInput
    disconnect?: CreatorProfileWhereInput | boolean
    delete?: CreatorProfileWhereInput | boolean
    connect?: CreatorProfileWhereUniqueInput
    update?: XOR<XOR<CreatorProfileUpdateToOneWithWhereWithoutUserInput, CreatorProfileUpdateWithoutUserInput>, CreatorProfileUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type CreatorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorProfileCreateOrConnectWithoutUserInput
    upsert?: CreatorProfileUpsertWithoutUserInput
    disconnect?: CreatorProfileWhereInput | boolean
    delete?: CreatorProfileWhereInput | boolean
    connect?: CreatorProfileWhereUniqueInput
    update?: XOR<XOR<CreatorProfileUpdateToOneWithWhereWithoutUserInput, CreatorProfileUpdateWithoutUserInput>, CreatorProfileUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type CreatorProfileCreateplatformsInput = {
    set: $Enums.Platform[]
  }

  export type CreatorProfileCreatediscoverySourcesInput = {
    set: $Enums.DiscoverySource[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type CreatorProfileUpdateplatformsInput = {
    set?: $Enums.Platform[]
    push?: $Enums.Platform | $Enums.Platform[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEventAttendanceFieldUpdateOperationsInput = {
    set?: $Enums.EventAttendance
  }

  export type CreatorProfileUpdatediscoverySourcesInput = {
    set?: $Enums.DiscoverySource[]
    push?: $Enums.DiscoverySource | $Enums.DiscoverySource[]
  }

  export type EnumCreatorLevelFieldUpdateOperationsInput = {
    set?: $Enums.CreatorLevel
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRankFieldUpdateOperationsInput = {
    set?: $Enums.Rank
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type SubmissionCreatecontentTypesInput = {
    set: $Enums.ContentType[]
  }

  export type SubmissionCreatemonsterAppearancesInput = {
    set: $Enums.MonsterAppearance[]
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPlatformFieldUpdateOperationsInput = {
    set?: $Enums.Platform
  }

  export type SubmissionUpdatecontentTypesInput = {
    set?: $Enums.ContentType[]
    push?: $Enums.ContentType | $Enums.ContentType[]
  }

  export type SubmissionUpdatemonsterAppearancesInput = {
    set?: $Enums.MonsterAppearance[]
    push?: $Enums.MonsterAppearance | $Enums.MonsterAppearance[]
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumEventAttendanceFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendance | EnumEventAttendanceFieldRefInput<$PrismaModel>
    in?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    not?: NestedEnumEventAttendanceFilter<$PrismaModel> | $Enums.EventAttendance
  }

  export type NestedEnumCreatorLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorLevel | EnumCreatorLevelFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorLevelFilter<$PrismaModel> | $Enums.CreatorLevel
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRankFilter<$PrismaModel = never> = {
    equals?: $Enums.Rank | EnumRankFieldRefInput<$PrismaModel>
    in?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    not?: NestedEnumRankFilter<$PrismaModel> | $Enums.Rank
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedEnumEventAttendanceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendance | EnumEventAttendanceFieldRefInput<$PrismaModel>
    in?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    not?: NestedEnumEventAttendanceWithAggregatesFilter<$PrismaModel> | $Enums.EventAttendance
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventAttendanceFilter<$PrismaModel>
    _max?: NestedEnumEventAttendanceFilter<$PrismaModel>
  }

  export type NestedEnumCreatorLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorLevel | EnumCreatorLevelFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorLevel[] | ListEnumCreatorLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorLevelWithAggregatesFilter<$PrismaModel> | $Enums.CreatorLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreatorLevelFilter<$PrismaModel>
    _max?: NestedEnumCreatorLevelFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRankWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rank | EnumRankFieldRefInput<$PrismaModel>
    in?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rank[] | ListEnumRankFieldRefInput<$PrismaModel>
    not?: NestedEnumRankWithAggregatesFilter<$PrismaModel> | $Enums.Rank
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRankFilter<$PrismaModel>
    _max?: NestedEnumRankFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type NestedEnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type CreatorProfileCreateWithoutUserInput = {
    id?: string
    channelLogo?: string | null
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    contentType: string
    socialMediaLink: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin: string
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: number
    currentLevel?: $Enums.CreatorLevel
    levelProgress?: number
    rank?: $Enums.Rank
    streamCount?: number
    shortCount?: number
    reelCount?: number
    totalReach?: number
    totalViews?: number
    cohortMonth?: number | null
    joinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    channelLogo?: string | null
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    contentType: string
    socialMediaLink: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin: string
    isApproved?: boolean
    isActive?: boolean
    totalPoints?: number
    currentLevel?: $Enums.CreatorLevel
    levelProgress?: number
    rank?: $Enums.Rank
    streamCount?: number
    shortCount?: number
    reelCount?: number
    totalReach?: number
    totalViews?: number
    cohortMonth?: number | null
    joinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileCreateOrConnectWithoutUserInput = {
    where: CreatorProfileWhereUniqueInput
    create: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateWithoutUserInput = {
    id?: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl?: string | null
    pointsAwarded?: number
    adminNotes?: string | null
    submittedByAdminId?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl?: string | null
    pointsAwarded?: number
    adminNotes?: string | null
    submittedByAdminId?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateManyUserInputEnvelope = {
    data: SubmissionCreateManyUserInput | SubmissionCreateManyUserInput[]
  }

  export type CreatorProfileUpsertWithoutUserInput = {
    update: XOR<CreatorProfileUpdateWithoutUserInput, CreatorProfileUncheckedUpdateWithoutUserInput>
    create: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
    where?: CreatorProfileWhereInput
  }

  export type CreatorProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: CreatorProfileWhereInput
    data: XOR<CreatorProfileUpdateWithoutUserInput, CreatorProfileUncheckedUpdateWithoutUserInput>
  }

  export type CreatorProfileUpdateWithoutUserInput = {
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    contentType?: StringFieldUpdateOperationsInput | string
    socialMediaLink?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalPoints?: IntFieldUpdateOperationsInput | number
    currentLevel?: EnumCreatorLevelFieldUpdateOperationsInput | $Enums.CreatorLevel
    levelProgress?: FloatFieldUpdateOperationsInput | number
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    streamCount?: IntFieldUpdateOperationsInput | number
    shortCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    cohortMonth?: NullableIntFieldUpdateOperationsInput | number | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileUncheckedUpdateWithoutUserInput = {
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    contentType?: StringFieldUpdateOperationsInput | string
    socialMediaLink?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalPoints?: IntFieldUpdateOperationsInput | number
    currentLevel?: EnumCreatorLevelFieldUpdateOperationsInput | $Enums.CreatorLevel
    levelProgress?: FloatFieldUpdateOperationsInput | number
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    streamCount?: IntFieldUpdateOperationsInput | number
    shortCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    cohortMonth?: NullableIntFieldUpdateOperationsInput | number | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutUserInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    rank?: EnumRankFilter<"Submission"> | $Enums.Rank
    platform?: EnumPlatformFilter<"Submission"> | $Enums.Platform
    contentLink?: StringFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    totalReach?: IntFilter<"Submission"> | number
    totalViews?: IntFilter<"Submission"> | number
    statsScreenshotUrl?: StringNullableFilter<"Submission"> | string | null
    pointsAwarded?: IntFilter<"Submission"> | number
    adminNotes?: StringNullableFilter<"Submission"> | string | null
    submittedByAdminId?: StringNullableFilter<"Submission"> | string | null
    isApproved?: BoolFilter<"Submission"> | boolean
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    submissions?: SubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    profile?: CreatorProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    externalId?: string | null
    provider?: string | null
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    firstName: string
    lastName: string
    username: string
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    profile?: CreatorProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: CreatorProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: CreatorProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type SubmissionCreateManyUserInput = {
    id?: string
    rank: $Enums.Rank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach: number
    totalViews: number
    statsScreenshotUrl?: string | null
    pointsAwarded?: number
    adminNotes?: string | null
    submittedByAdminId?: string | null
    isApproved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateWithoutUserInput = {
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateWithoutUserInput = {
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutUserInput = {
    rank?: EnumRankFieldUpdateOperationsInput | $Enums.Rank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    totalReach?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pointsAwarded?: IntFieldUpdateOperationsInput | number
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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