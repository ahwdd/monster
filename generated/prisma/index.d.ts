
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
 * Model PlatformLink
 * 
 */
export type PlatformLink = $Result.DefaultSelection<Prisma.$PlatformLinkPayload>
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
 * Model MonthlySnapshot
 * 
 */
export type MonthlySnapshot = $Result.DefaultSelection<Prisma.$MonthlySnapshotPayload>
/**
 * Model PlatformStat
 * 
 */
export type PlatformStat = $Result.DefaultSelection<Prisma.$PlatformStatPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const RegistrationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RegistrationStatus = (typeof RegistrationStatus)[keyof typeof RegistrationStatus]


export const SubmissionStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type SubmissionStatus = (typeof SubmissionStatus)[keyof typeof SubmissionStatus]


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
  PICTURE: 'PICTURE',
  STORY: 'STORY',
  REEL: 'REEL',
  LONG_VIDEO: 'LONG_VIDEO',
  POST: 'POST',
  LIVE: 'LIVE',
  STREAM: 'STREAM'
};

export type ContentType = (typeof ContentType)[keyof typeof ContentType]


export const MonsterAppearance: {
  MONSTER_THEME: 'MONSTER_THEME',
  LAYOUT: 'LAYOUT',
  LOGO: 'LOGO',
  MONSTER_PRODUCTS: 'MONSTER_PRODUCTS'
};

export type MonsterAppearance = (typeof MonsterAppearance)[keyof typeof MonsterAppearance]


export const EventAttendance: {
  YES: 'YES',
  SOMETIMES: 'SOMETIMES',
  NO: 'NO'
};

export type EventAttendance = (typeof EventAttendance)[keyof typeof EventAttendance]


export const DiscoverySource: {
  FRIEND_RECOMMENDATION: 'FRIEND_RECOMMENDATION',
  COMMUNITY_MESSAGES: 'COMMUNITY_MESSAGES',
  SOCIAL_MEDIA_POSTS: 'SOCIAL_MEDIA_POSTS',
  MONSTER_EVENTS: 'MONSTER_EVENTS'
};

export type DiscoverySource = (typeof DiscoverySource)[keyof typeof DiscoverySource]


export const CreatorRank: {
  UNRANKED: 'UNRANKED',
  ROOKIE: 'ROOKIE',
  MEGA: 'MEGA',
  RISING: 'RISING',
  ELITE: 'ELITE',
  COLD: 'COLD'
};

export type CreatorRank = (typeof CreatorRank)[keyof typeof CreatorRank]


export const SubmissionRejectionReason: {
  LOW_QUALITY: 'LOW_QUALITY',
  WRONG_CONTENT_TYPE: 'WRONG_CONTENT_TYPE',
  INSUFFICIENT_REACH: 'INSUFFICIENT_REACH',
  GUIDELINE_VIOLATION: 'GUIDELINE_VIOLATION',
  DUPLICATE: 'DUPLICATE',
  OTHER: 'OTHER'
};

export type SubmissionRejectionReason = (typeof SubmissionRejectionReason)[keyof typeof SubmissionRejectionReason]


export const RegistrationRejectionReason: {
  INELIGIBLE_REGION: 'INELIGIBLE_REGION',
  COMPETING_BRAND: 'COMPETING_BRAND',
  INSUFFICIENT_FOLLOWERS: 'INSUFFICIENT_FOLLOWERS',
  INCOMPLETE_PROFILE: 'INCOMPLETE_PROFILE',
  OTHER: 'OTHER'
};

export type RegistrationRejectionReason = (typeof RegistrationRejectionReason)[keyof typeof RegistrationRejectionReason]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type RegistrationStatus = $Enums.RegistrationStatus

export const RegistrationStatus: typeof $Enums.RegistrationStatus

export type SubmissionStatus = $Enums.SubmissionStatus

export const SubmissionStatus: typeof $Enums.SubmissionStatus

export type Platform = $Enums.Platform

export const Platform: typeof $Enums.Platform

export type ContentType = $Enums.ContentType

export const ContentType: typeof $Enums.ContentType

export type MonsterAppearance = $Enums.MonsterAppearance

export const MonsterAppearance: typeof $Enums.MonsterAppearance

export type EventAttendance = $Enums.EventAttendance

export const EventAttendance: typeof $Enums.EventAttendance

export type DiscoverySource = $Enums.DiscoverySource

export const DiscoverySource: typeof $Enums.DiscoverySource

export type CreatorRank = $Enums.CreatorRank

export const CreatorRank: typeof $Enums.CreatorRank

export type SubmissionRejectionReason = $Enums.SubmissionRejectionReason

export const SubmissionRejectionReason: typeof $Enums.SubmissionRejectionReason

export type RegistrationRejectionReason = $Enums.RegistrationRejectionReason

export const RegistrationRejectionReason: typeof $Enums.RegistrationRejectionReason

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

  /**
   * `prisma.monthlySnapshot`: Exposes CRUD operations for the **MonthlySnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlySnapshots
    * const monthlySnapshots = await prisma.monthlySnapshot.findMany()
    * ```
    */
  get monthlySnapshot(): Prisma.MonthlySnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platformStat`: Exposes CRUD operations for the **PlatformStat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformStats
    * const platformStats = await prisma.platformStat.findMany()
    * ```
    */
  get platformStat(): Prisma.PlatformStatDelegate<ExtArgs, ClientOptions>;
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
    Submission: 'Submission',
    MonthlySnapshot: 'MonthlySnapshot',
    PlatformStat: 'PlatformStat'
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
      modelProps: "user" | "creatorProfile" | "submission" | "monthlySnapshot" | "platformStat"
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
      MonthlySnapshot: {
        payload: Prisma.$MonthlySnapshotPayload<ExtArgs>
        fields: Prisma.MonthlySnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlySnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlySnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>
          }
          findFirst: {
            args: Prisma.MonthlySnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlySnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>
          }
          findMany: {
            args: Prisma.MonthlySnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>[]
          }
          create: {
            args: Prisma.MonthlySnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>
          }
          createMany: {
            args: Prisma.MonthlySnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MonthlySnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>
          }
          update: {
            args: Prisma.MonthlySnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>
          }
          deleteMany: {
            args: Prisma.MonthlySnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlySnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MonthlySnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlySnapshotPayload>
          }
          aggregate: {
            args: Prisma.MonthlySnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlySnapshot>
          }
          groupBy: {
            args: Prisma.MonthlySnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlySnapshotGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MonthlySnapshotFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MonthlySnapshotAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MonthlySnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlySnapshotCountAggregateOutputType> | number
          }
        }
      }
      PlatformStat: {
        payload: Prisma.$PlatformStatPayload<ExtArgs>
        fields: Prisma.PlatformStatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformStatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformStatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>
          }
          findFirst: {
            args: Prisma.PlatformStatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformStatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>
          }
          findMany: {
            args: Prisma.PlatformStatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>[]
          }
          create: {
            args: Prisma.PlatformStatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>
          }
          createMany: {
            args: Prisma.PlatformStatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlatformStatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>
          }
          update: {
            args: Prisma.PlatformStatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>
          }
          deleteMany: {
            args: Prisma.PlatformStatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformStatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlatformStatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStatPayload>
          }
          aggregate: {
            args: Prisma.PlatformStatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformStat>
          }
          groupBy: {
            args: Prisma.PlatformStatGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformStatGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PlatformStatFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PlatformStatAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PlatformStatCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformStatCountAggregateOutputType> | number
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
    monthlySnapshot?: MonthlySnapshotOmit
    platformStat?: PlatformStatOmit
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
    snapshots: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    snapshots?: boolean | UserCountOutputTypeCountSnapshotsArgs
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlySnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PlatformLink
   */





  export type PlatformLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    platform?: boolean
    url?: boolean
  }, ExtArgs["result"]["platformLink"]>



  export type PlatformLinkSelectScalar = {
    platform?: boolean
    url?: boolean
  }

  export type PlatformLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"platform" | "url", ExtArgs["result"]["platformLink"]>

  export type $PlatformLinkPayload = {
    name: "PlatformLink"
    objects: {}
    scalars: {
      platform: $Enums.Platform
      url: string
    }
    composites: {}
  }

  type PlatformLinkGetPayload<S extends boolean | null | undefined | PlatformLinkDefaultArgs> = $Result.GetResult<Prisma.$PlatformLinkPayload, S>





  /**
   * Fields of the PlatformLink model
   */
  interface PlatformLinkFieldRefs {
    readonly platform: FieldRef<"PlatformLink", 'Platform'>
    readonly url: FieldRef<"PlatformLink", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlatformLink without action
   */
  export type PlatformLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformLink
     */
    select?: PlatformLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformLink
     */
    omit?: PlatformLinkOmit<ExtArgs> | null
  }


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
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    phone: string | null
    phoneKey: string | null
    isVerified: boolean | null
    isActive: boolean | null
    role: $Enums.UserRole | null
    externalId: string | null
    provider: string | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    phone: string | null
    phoneKey: string | null
    isVerified: boolean | null
    isActive: boolean | null
    role: $Enums.UserRole | null
    externalId: string | null
    provider: string | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    username: number
    email: number
    phone: number
    phoneKey: number
    isVerified: number
    isActive: number
    role: number
    externalId: number
    provider: number
    lastLogin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    phone?: true
    phoneKey?: true
    isVerified?: true
    isActive?: true
    role?: true
    externalId?: true
    provider?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    phone?: true
    phoneKey?: true
    isVerified?: true
    isActive?: true
    role?: true
    externalId?: true
    provider?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    phone?: true
    phoneKey?: true
    isVerified?: true
    isActive?: true
    role?: true
    externalId?: true
    provider?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
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
    firstName: string
    lastName: string
    username: string
    email: string | null
    phone: string | null
    phoneKey: string | null
    isVerified: boolean
    isActive: boolean
    role: $Enums.UserRole
    externalId: string | null
    provider: string | null
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
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
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    phone?: boolean
    phoneKey?: boolean
    isVerified?: boolean
    isActive?: boolean
    role?: boolean
    externalId?: boolean
    provider?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    snapshots?: boolean | User$snapshotsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    phone?: boolean
    phoneKey?: boolean
    isVerified?: boolean
    isActive?: boolean
    role?: boolean
    externalId?: boolean
    provider?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "username" | "email" | "phone" | "phoneKey" | "isVerified" | "isActive" | "role" | "externalId" | "provider" | "lastLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    snapshots?: boolean | User$snapshotsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$CreatorProfilePayload<ExtArgs> | null
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      snapshots: Prisma.$MonthlySnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      username: string
      email: string | null
      phone: string | null
      phoneKey: string | null
      isVerified: boolean
      isActive: boolean
      role: $Enums.UserRole
      externalId: string | null
      provider: string | null
      lastLogin: Date | null
      createdAt: Date
      updatedAt: Date
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
    snapshots<T extends User$snapshotsArgs<ExtArgs> = {}>(args?: Subset<T, User$snapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly phoneKey: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly externalId: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
   * User.snapshots
   */
  export type User$snapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    where?: MonthlySnapshotWhereInput
    orderBy?: MonthlySnapshotOrderByWithRelationInput | MonthlySnapshotOrderByWithRelationInput[]
    cursor?: MonthlySnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlySnapshotScalarFieldEnum | MonthlySnapshotScalarFieldEnum[]
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
    currentRankReach: number | null
    totalReachAllTime: number | null
    pictureCount: number | null
    storyCount: number | null
    reelCount: number | null
    longVideoCount: number | null
    postCount: number | null
    totalPictureCount: number | null
    totalStoryCount: number | null
    totalReelCount: number | null
    totalLongVideoCount: number | null
    totalPostCount: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
  }

  export type CreatorProfileSumAggregateOutputType = {
    followers: number | null
    currentRankReach: number | null
    totalReachAllTime: number | null
    pictureCount: number | null
    storyCount: number | null
    reelCount: number | null
    longVideoCount: number | null
    postCount: number | null
    totalPictureCount: number | null
    totalStoryCount: number | null
    totalReelCount: number | null
    totalLongVideoCount: number | null
    totalPostCount: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
  }

  export type CreatorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    realName: string | null
    contactEmail: string | null
    contactPhone: string | null
    nickname: string | null
    birthDate: string | null
    nationality: string | null
    residency: string | null
    primarySocialLink: string | null
    channelLogo: string | null
    contentType: string | null
    followers: number | null
    eventAttendance: $Enums.EventAttendance | null
    whyJoin: string | null
    status: $Enums.RegistrationStatus | null
    adminNotes: string | null
    adminNote: string | null
    registrationRejection: $Enums.RegistrationRejectionReason | null
    approvedAt: Date | null
    rank: $Enums.CreatorRank | null
    currentRankReach: number | null
    totalReachAllTime: number | null
    pictureCount: number | null
    storyCount: number | null
    reelCount: number | null
    longVideoCount: number | null
    postCount: number | null
    totalPictureCount: number | null
    totalStoryCount: number | null
    totalReelCount: number | null
    totalLongVideoCount: number | null
    totalPostCount: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
    rankedUpAt: Date | null
    isActive: boolean | null
    joinedAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    realName: string | null
    contactEmail: string | null
    contactPhone: string | null
    nickname: string | null
    birthDate: string | null
    nationality: string | null
    residency: string | null
    primarySocialLink: string | null
    channelLogo: string | null
    contentType: string | null
    followers: number | null
    eventAttendance: $Enums.EventAttendance | null
    whyJoin: string | null
    status: $Enums.RegistrationStatus | null
    adminNotes: string | null
    adminNote: string | null
    registrationRejection: $Enums.RegistrationRejectionReason | null
    approvedAt: Date | null
    rank: $Enums.CreatorRank | null
    currentRankReach: number | null
    totalReachAllTime: number | null
    pictureCount: number | null
    storyCount: number | null
    reelCount: number | null
    longVideoCount: number | null
    postCount: number | null
    totalPictureCount: number | null
    totalStoryCount: number | null
    totalReelCount: number | null
    totalLongVideoCount: number | null
    totalPostCount: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
    rankedUpAt: Date | null
    isActive: boolean | null
    joinedAt: Date | null
    updatedAt: Date | null
  }

  export type CreatorProfileCountAggregateOutputType = {
    id: number
    userId: number
    realName: number
    contactEmail: number
    contactPhone: number
    nickname: number
    birthDate: number
    nationality: number
    residency: number
    platforms: number
    primarySocialLink: number
    channelLogo: number
    contentType: number
    followers: number
    eventAttendance: number
    discoverySources: number
    whyJoin: number
    status: number
    adminNotes: number
    adminNote: number
    registrationRejection: number
    approvedAt: number
    rank: number
    currentRankReach: number
    totalReachAllTime: number
    pictureCount: number
    storyCount: number
    reelCount: number
    longVideoCount: number
    postCount: number
    totalPictureCount: number
    totalStoryCount: number
    totalReelCount: number
    totalLongVideoCount: number
    totalPostCount: number
    engagementRate: number
    commitmentScore: number
    adminGradeScore: number
    rankedUpAt: number
    isActive: number
    joinedAt: number
    updatedAt: number
    _all: number
  }


  export type CreatorProfileAvgAggregateInputType = {
    followers?: true
    currentRankReach?: true
    totalReachAllTime?: true
    pictureCount?: true
    storyCount?: true
    reelCount?: true
    longVideoCount?: true
    postCount?: true
    totalPictureCount?: true
    totalStoryCount?: true
    totalReelCount?: true
    totalLongVideoCount?: true
    totalPostCount?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
  }

  export type CreatorProfileSumAggregateInputType = {
    followers?: true
    currentRankReach?: true
    totalReachAllTime?: true
    pictureCount?: true
    storyCount?: true
    reelCount?: true
    longVideoCount?: true
    postCount?: true
    totalPictureCount?: true
    totalStoryCount?: true
    totalReelCount?: true
    totalLongVideoCount?: true
    totalPostCount?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
  }

  export type CreatorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    realName?: true
    contactEmail?: true
    contactPhone?: true
    nickname?: true
    birthDate?: true
    nationality?: true
    residency?: true
    primarySocialLink?: true
    channelLogo?: true
    contentType?: true
    followers?: true
    eventAttendance?: true
    whyJoin?: true
    status?: true
    adminNotes?: true
    adminNote?: true
    registrationRejection?: true
    approvedAt?: true
    rank?: true
    currentRankReach?: true
    totalReachAllTime?: true
    pictureCount?: true
    storyCount?: true
    reelCount?: true
    longVideoCount?: true
    postCount?: true
    totalPictureCount?: true
    totalStoryCount?: true
    totalReelCount?: true
    totalLongVideoCount?: true
    totalPostCount?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    rankedUpAt?: true
    isActive?: true
    joinedAt?: true
    updatedAt?: true
  }

  export type CreatorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    realName?: true
    contactEmail?: true
    contactPhone?: true
    nickname?: true
    birthDate?: true
    nationality?: true
    residency?: true
    primarySocialLink?: true
    channelLogo?: true
    contentType?: true
    followers?: true
    eventAttendance?: true
    whyJoin?: true
    status?: true
    adminNotes?: true
    adminNote?: true
    registrationRejection?: true
    approvedAt?: true
    rank?: true
    currentRankReach?: true
    totalReachAllTime?: true
    pictureCount?: true
    storyCount?: true
    reelCount?: true
    longVideoCount?: true
    postCount?: true
    totalPictureCount?: true
    totalStoryCount?: true
    totalReelCount?: true
    totalLongVideoCount?: true
    totalPostCount?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    rankedUpAt?: true
    isActive?: true
    joinedAt?: true
    updatedAt?: true
  }

  export type CreatorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    realName?: true
    contactEmail?: true
    contactPhone?: true
    nickname?: true
    birthDate?: true
    nationality?: true
    residency?: true
    platforms?: true
    primarySocialLink?: true
    channelLogo?: true
    contentType?: true
    followers?: true
    eventAttendance?: true
    discoverySources?: true
    whyJoin?: true
    status?: true
    adminNotes?: true
    adminNote?: true
    registrationRejection?: true
    approvedAt?: true
    rank?: true
    currentRankReach?: true
    totalReachAllTime?: true
    pictureCount?: true
    storyCount?: true
    reelCount?: true
    longVideoCount?: true
    postCount?: true
    totalPictureCount?: true
    totalStoryCount?: true
    totalReelCount?: true
    totalLongVideoCount?: true
    totalPostCount?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    rankedUpAt?: true
    isActive?: true
    joinedAt?: true
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
    realName: string
    contactEmail: string | null
    contactPhone: string | null
    nickname: string
    birthDate: string
    nationality: string
    residency: string
    platforms: $Enums.Platform[]
    primarySocialLink: string
    channelLogo: string | null
    contentType: string
    followers: number
    eventAttendance: $Enums.EventAttendance
    discoverySources: $Enums.DiscoverySource[]
    whyJoin: string | null
    status: $Enums.RegistrationStatus
    adminNotes: string | null
    adminNote: string | null
    registrationRejection: $Enums.RegistrationRejectionReason | null
    approvedAt: Date | null
    rank: $Enums.CreatorRank
    currentRankReach: number
    totalReachAllTime: number
    pictureCount: number
    storyCount: number
    reelCount: number
    longVideoCount: number
    postCount: number
    totalPictureCount: number
    totalStoryCount: number
    totalReelCount: number
    totalLongVideoCount: number
    totalPostCount: number
    engagementRate: number
    commitmentScore: number
    adminGradeScore: number
    rankedUpAt: Date | null
    isActive: boolean
    joinedAt: Date
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
    realName?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    nickname?: boolean
    birthDate?: boolean
    nationality?: boolean
    residency?: boolean
    platforms?: boolean
    platformLinks?: boolean | PlatformLinkDefaultArgs<ExtArgs>
    primarySocialLink?: boolean
    channelLogo?: boolean
    contentType?: boolean
    followers?: boolean
    eventAttendance?: boolean
    discoverySources?: boolean
    whyJoin?: boolean
    status?: boolean
    adminNotes?: boolean
    adminNote?: boolean
    registrationRejection?: boolean
    approvedAt?: boolean
    rank?: boolean
    currentRankReach?: boolean
    totalReachAllTime?: boolean
    pictureCount?: boolean
    storyCount?: boolean
    reelCount?: boolean
    longVideoCount?: boolean
    postCount?: boolean
    totalPictureCount?: boolean
    totalStoryCount?: boolean
    totalReelCount?: boolean
    totalLongVideoCount?: boolean
    totalPostCount?: boolean
    engagementRate?: boolean
    commitmentScore?: boolean
    adminGradeScore?: boolean
    rankedUpAt?: boolean
    isActive?: boolean
    joinedAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorProfile"]>



  export type CreatorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    realName?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    nickname?: boolean
    birthDate?: boolean
    nationality?: boolean
    residency?: boolean
    platforms?: boolean
    primarySocialLink?: boolean
    channelLogo?: boolean
    contentType?: boolean
    followers?: boolean
    eventAttendance?: boolean
    discoverySources?: boolean
    whyJoin?: boolean
    status?: boolean
    adminNotes?: boolean
    adminNote?: boolean
    registrationRejection?: boolean
    approvedAt?: boolean
    rank?: boolean
    currentRankReach?: boolean
    totalReachAllTime?: boolean
    pictureCount?: boolean
    storyCount?: boolean
    reelCount?: boolean
    longVideoCount?: boolean
    postCount?: boolean
    totalPictureCount?: boolean
    totalStoryCount?: boolean
    totalReelCount?: boolean
    totalLongVideoCount?: boolean
    totalPostCount?: boolean
    engagementRate?: boolean
    commitmentScore?: boolean
    adminGradeScore?: boolean
    rankedUpAt?: boolean
    isActive?: boolean
    joinedAt?: boolean
    updatedAt?: boolean
  }

  export type CreatorProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "realName" | "contactEmail" | "contactPhone" | "nickname" | "birthDate" | "nationality" | "residency" | "platforms" | "platformLinks" | "primarySocialLink" | "channelLogo" | "contentType" | "followers" | "eventAttendance" | "discoverySources" | "whyJoin" | "status" | "adminNotes" | "adminNote" | "registrationRejection" | "approvedAt" | "rank" | "currentRankReach" | "totalReachAllTime" | "pictureCount" | "storyCount" | "reelCount" | "longVideoCount" | "postCount" | "totalPictureCount" | "totalStoryCount" | "totalReelCount" | "totalLongVideoCount" | "totalPostCount" | "engagementRate" | "commitmentScore" | "adminGradeScore" | "rankedUpAt" | "isActive" | "joinedAt" | "updatedAt", ExtArgs["result"]["creatorProfile"]>
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
      realName: string
      contactEmail: string | null
      contactPhone: string | null
      nickname: string
      birthDate: string
      nationality: string
      residency: string
      platforms: $Enums.Platform[]
      primarySocialLink: string
      channelLogo: string | null
      contentType: string
      followers: number
      eventAttendance: $Enums.EventAttendance
      discoverySources: $Enums.DiscoverySource[]
      whyJoin: string | null
      status: $Enums.RegistrationStatus
      adminNotes: string | null
      adminNote: string | null
      registrationRejection: $Enums.RegistrationRejectionReason | null
      approvedAt: Date | null
      rank: $Enums.CreatorRank
      currentRankReach: number
      totalReachAllTime: number
      pictureCount: number
      storyCount: number
      reelCount: number
      longVideoCount: number
      postCount: number
      totalPictureCount: number
      totalStoryCount: number
      totalReelCount: number
      totalLongVideoCount: number
      totalPostCount: number
      engagementRate: number
      commitmentScore: number
      adminGradeScore: number
      rankedUpAt: Date | null
      isActive: boolean
      joinedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creatorProfile"]>
    composites: {
      platformLinks: Prisma.$PlatformLinkPayload[]
    }
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
    readonly realName: FieldRef<"CreatorProfile", 'String'>
    readonly contactEmail: FieldRef<"CreatorProfile", 'String'>
    readonly contactPhone: FieldRef<"CreatorProfile", 'String'>
    readonly nickname: FieldRef<"CreatorProfile", 'String'>
    readonly birthDate: FieldRef<"CreatorProfile", 'String'>
    readonly nationality: FieldRef<"CreatorProfile", 'String'>
    readonly residency: FieldRef<"CreatorProfile", 'String'>
    readonly platforms: FieldRef<"CreatorProfile", 'Platform[]'>
    readonly primarySocialLink: FieldRef<"CreatorProfile", 'String'>
    readonly channelLogo: FieldRef<"CreatorProfile", 'String'>
    readonly contentType: FieldRef<"CreatorProfile", 'String'>
    readonly followers: FieldRef<"CreatorProfile", 'Int'>
    readonly eventAttendance: FieldRef<"CreatorProfile", 'EventAttendance'>
    readonly discoverySources: FieldRef<"CreatorProfile", 'DiscoverySource[]'>
    readonly whyJoin: FieldRef<"CreatorProfile", 'String'>
    readonly status: FieldRef<"CreatorProfile", 'RegistrationStatus'>
    readonly adminNotes: FieldRef<"CreatorProfile", 'String'>
    readonly adminNote: FieldRef<"CreatorProfile", 'String'>
    readonly registrationRejection: FieldRef<"CreatorProfile", 'RegistrationRejectionReason'>
    readonly approvedAt: FieldRef<"CreatorProfile", 'DateTime'>
    readonly rank: FieldRef<"CreatorProfile", 'CreatorRank'>
    readonly currentRankReach: FieldRef<"CreatorProfile", 'Int'>
    readonly totalReachAllTime: FieldRef<"CreatorProfile", 'Int'>
    readonly pictureCount: FieldRef<"CreatorProfile", 'Int'>
    readonly storyCount: FieldRef<"CreatorProfile", 'Int'>
    readonly reelCount: FieldRef<"CreatorProfile", 'Int'>
    readonly longVideoCount: FieldRef<"CreatorProfile", 'Int'>
    readonly postCount: FieldRef<"CreatorProfile", 'Int'>
    readonly totalPictureCount: FieldRef<"CreatorProfile", 'Int'>
    readonly totalStoryCount: FieldRef<"CreatorProfile", 'Int'>
    readonly totalReelCount: FieldRef<"CreatorProfile", 'Int'>
    readonly totalLongVideoCount: FieldRef<"CreatorProfile", 'Int'>
    readonly totalPostCount: FieldRef<"CreatorProfile", 'Int'>
    readonly engagementRate: FieldRef<"CreatorProfile", 'Float'>
    readonly commitmentScore: FieldRef<"CreatorProfile", 'Float'>
    readonly adminGradeScore: FieldRef<"CreatorProfile", 'Float'>
    readonly rankedUpAt: FieldRef<"CreatorProfile", 'DateTime'>
    readonly isActive: FieldRef<"CreatorProfile", 'Boolean'>
    readonly joinedAt: FieldRef<"CreatorProfile", 'DateTime'>
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
    submittedReach: number | null
    acceptedReach: number | null
    pendingReach: number | null
    previousAcceptedReach: number | null
    engagementRate: number | null
    submittedLikes: number | null
    submittedComments: number | null
    submittedShares: number | null
    qualityRating: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    submittedReach: number | null
    acceptedReach: number | null
    pendingReach: number | null
    previousAcceptedReach: number | null
    engagementRate: number | null
    submittedLikes: number | null
    submittedComments: number | null
    submittedShares: number | null
    qualityRating: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    nickname: string | null
    rank: $Enums.CreatorRank | null
    platform: $Enums.Platform | null
    contentLink: string | null
    submittedReach: number | null
    acceptedReach: number | null
    pendingReach: number | null
    previousAcceptedReach: number | null
    statsScreenshotUrl: string | null
    engagementRate: number | null
    submittedLikes: number | null
    submittedComments: number | null
    submittedShares: number | null
    status: $Enums.SubmissionStatus | null
    adminNotes: string | null
    rejectionReason: $Enums.SubmissionRejectionReason | null
    qualityRating: number | null
    isEdited: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    nickname: string | null
    rank: $Enums.CreatorRank | null
    platform: $Enums.Platform | null
    contentLink: string | null
    submittedReach: number | null
    acceptedReach: number | null
    pendingReach: number | null
    previousAcceptedReach: number | null
    statsScreenshotUrl: string | null
    engagementRate: number | null
    submittedLikes: number | null
    submittedComments: number | null
    submittedShares: number | null
    status: $Enums.SubmissionStatus | null
    adminNotes: string | null
    rejectionReason: $Enums.SubmissionRejectionReason | null
    qualityRating: number | null
    isEdited: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    userId: number
    nickname: number
    rank: number
    platform: number
    contentLink: number
    contentTypes: number
    monsterAppearances: number
    submittedReach: number
    acceptedReach: number
    pendingReach: number
    previousAcceptedReach: number
    statsScreenshotUrl: number
    engagementRate: number
    submittedLikes: number
    submittedComments: number
    submittedShares: number
    status: number
    adminNotes: number
    rejectionReason: number
    qualityRating: number
    isEdited: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    submittedReach?: true
    acceptedReach?: true
    pendingReach?: true
    previousAcceptedReach?: true
    engagementRate?: true
    submittedLikes?: true
    submittedComments?: true
    submittedShares?: true
    qualityRating?: true
  }

  export type SubmissionSumAggregateInputType = {
    submittedReach?: true
    acceptedReach?: true
    pendingReach?: true
    previousAcceptedReach?: true
    engagementRate?: true
    submittedLikes?: true
    submittedComments?: true
    submittedShares?: true
    qualityRating?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    userId?: true
    nickname?: true
    rank?: true
    platform?: true
    contentLink?: true
    submittedReach?: true
    acceptedReach?: true
    pendingReach?: true
    previousAcceptedReach?: true
    statsScreenshotUrl?: true
    engagementRate?: true
    submittedLikes?: true
    submittedComments?: true
    submittedShares?: true
    status?: true
    adminNotes?: true
    rejectionReason?: true
    qualityRating?: true
    isEdited?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    userId?: true
    nickname?: true
    rank?: true
    platform?: true
    contentLink?: true
    submittedReach?: true
    acceptedReach?: true
    pendingReach?: true
    previousAcceptedReach?: true
    statsScreenshotUrl?: true
    engagementRate?: true
    submittedLikes?: true
    submittedComments?: true
    submittedShares?: true
    status?: true
    adminNotes?: true
    rejectionReason?: true
    qualityRating?: true
    isEdited?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    userId?: true
    nickname?: true
    rank?: true
    platform?: true
    contentLink?: true
    contentTypes?: true
    monsterAppearances?: true
    submittedReach?: true
    acceptedReach?: true
    pendingReach?: true
    previousAcceptedReach?: true
    statsScreenshotUrl?: true
    engagementRate?: true
    submittedLikes?: true
    submittedComments?: true
    submittedShares?: true
    status?: true
    adminNotes?: true
    rejectionReason?: true
    qualityRating?: true
    isEdited?: true
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
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes: $Enums.ContentType[]
    monsterAppearances: $Enums.MonsterAppearance[]
    submittedReach: number
    acceptedReach: number
    pendingReach: number | null
    previousAcceptedReach: number | null
    statsScreenshotUrl: string | null
    engagementRate: number | null
    submittedLikes: number | null
    submittedComments: number | null
    submittedShares: number | null
    status: $Enums.SubmissionStatus
    adminNotes: string | null
    rejectionReason: $Enums.SubmissionRejectionReason | null
    qualityRating: number | null
    isEdited: boolean
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
    nickname?: boolean
    rank?: boolean
    platform?: boolean
    contentLink?: boolean
    contentTypes?: boolean
    monsterAppearances?: boolean
    submittedReach?: boolean
    acceptedReach?: boolean
    pendingReach?: boolean
    previousAcceptedReach?: boolean
    statsScreenshotUrl?: boolean
    engagementRate?: boolean
    submittedLikes?: boolean
    submittedComments?: boolean
    submittedShares?: boolean
    status?: boolean
    adminNotes?: boolean
    rejectionReason?: boolean
    qualityRating?: boolean
    isEdited?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>



  export type SubmissionSelectScalar = {
    id?: boolean
    userId?: boolean
    nickname?: boolean
    rank?: boolean
    platform?: boolean
    contentLink?: boolean
    contentTypes?: boolean
    monsterAppearances?: boolean
    submittedReach?: boolean
    acceptedReach?: boolean
    pendingReach?: boolean
    previousAcceptedReach?: boolean
    statsScreenshotUrl?: boolean
    engagementRate?: boolean
    submittedLikes?: boolean
    submittedComments?: boolean
    submittedShares?: boolean
    status?: boolean
    adminNotes?: boolean
    rejectionReason?: boolean
    qualityRating?: boolean
    isEdited?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "nickname" | "rank" | "platform" | "contentLink" | "contentTypes" | "monsterAppearances" | "submittedReach" | "acceptedReach" | "pendingReach" | "previousAcceptedReach" | "statsScreenshotUrl" | "engagementRate" | "submittedLikes" | "submittedComments" | "submittedShares" | "status" | "adminNotes" | "rejectionReason" | "qualityRating" | "isEdited" | "createdAt" | "updatedAt", ExtArgs["result"]["submission"]>
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
      nickname: string
      rank: $Enums.CreatorRank
      platform: $Enums.Platform
      contentLink: string
      contentTypes: $Enums.ContentType[]
      monsterAppearances: $Enums.MonsterAppearance[]
      submittedReach: number
      acceptedReach: number
      pendingReach: number | null
      previousAcceptedReach: number | null
      statsScreenshotUrl: string | null
      engagementRate: number | null
      submittedLikes: number | null
      submittedComments: number | null
      submittedShares: number | null
      status: $Enums.SubmissionStatus
      adminNotes: string | null
      rejectionReason: $Enums.SubmissionRejectionReason | null
      qualityRating: number | null
      isEdited: boolean
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
    readonly nickname: FieldRef<"Submission", 'String'>
    readonly rank: FieldRef<"Submission", 'CreatorRank'>
    readonly platform: FieldRef<"Submission", 'Platform'>
    readonly contentLink: FieldRef<"Submission", 'String'>
    readonly contentTypes: FieldRef<"Submission", 'ContentType[]'>
    readonly monsterAppearances: FieldRef<"Submission", 'MonsterAppearance[]'>
    readonly submittedReach: FieldRef<"Submission", 'Int'>
    readonly acceptedReach: FieldRef<"Submission", 'Int'>
    readonly pendingReach: FieldRef<"Submission", 'Int'>
    readonly previousAcceptedReach: FieldRef<"Submission", 'Int'>
    readonly statsScreenshotUrl: FieldRef<"Submission", 'String'>
    readonly engagementRate: FieldRef<"Submission", 'Float'>
    readonly submittedLikes: FieldRef<"Submission", 'Int'>
    readonly submittedComments: FieldRef<"Submission", 'Int'>
    readonly submittedShares: FieldRef<"Submission", 'Int'>
    readonly status: FieldRef<"Submission", 'SubmissionStatus'>
    readonly adminNotes: FieldRef<"Submission", 'String'>
    readonly rejectionReason: FieldRef<"Submission", 'SubmissionRejectionReason'>
    readonly qualityRating: FieldRef<"Submission", 'Float'>
    readonly isEdited: FieldRef<"Submission", 'Boolean'>
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
   * Model MonthlySnapshot
   */

  export type AggregateMonthlySnapshot = {
    _count: MonthlySnapshotCountAggregateOutputType | null
    _avg: MonthlySnapshotAvgAggregateOutputType | null
    _sum: MonthlySnapshotSumAggregateOutputType | null
    _min: MonthlySnapshotMinAggregateOutputType | null
    _max: MonthlySnapshotMaxAggregateOutputType | null
  }

  export type MonthlySnapshotAvgAggregateOutputType = {
    reach: number | null
    totalReach: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
    approvedSubs: number | null
  }

  export type MonthlySnapshotSumAggregateOutputType = {
    reach: number | null
    totalReach: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
    approvedSubs: number | null
  }

  export type MonthlySnapshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    month: string | null
    rank: string | null
    reach: number | null
    totalReach: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
    approvedSubs: number | null
    createdAt: Date | null
  }

  export type MonthlySnapshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    month: string | null
    rank: string | null
    reach: number | null
    totalReach: number | null
    engagementRate: number | null
    commitmentScore: number | null
    adminGradeScore: number | null
    approvedSubs: number | null
    createdAt: Date | null
  }

  export type MonthlySnapshotCountAggregateOutputType = {
    id: number
    userId: number
    month: number
    rank: number
    reach: number
    totalReach: number
    engagementRate: number
    commitmentScore: number
    adminGradeScore: number
    approvedSubs: number
    createdAt: number
    _all: number
  }


  export type MonthlySnapshotAvgAggregateInputType = {
    reach?: true
    totalReach?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    approvedSubs?: true
  }

  export type MonthlySnapshotSumAggregateInputType = {
    reach?: true
    totalReach?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    approvedSubs?: true
  }

  export type MonthlySnapshotMinAggregateInputType = {
    id?: true
    userId?: true
    month?: true
    rank?: true
    reach?: true
    totalReach?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    approvedSubs?: true
    createdAt?: true
  }

  export type MonthlySnapshotMaxAggregateInputType = {
    id?: true
    userId?: true
    month?: true
    rank?: true
    reach?: true
    totalReach?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    approvedSubs?: true
    createdAt?: true
  }

  export type MonthlySnapshotCountAggregateInputType = {
    id?: true
    userId?: true
    month?: true
    rank?: true
    reach?: true
    totalReach?: true
    engagementRate?: true
    commitmentScore?: true
    adminGradeScore?: true
    approvedSubs?: true
    createdAt?: true
    _all?: true
  }

  export type MonthlySnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlySnapshot to aggregate.
     */
    where?: MonthlySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlySnapshots to fetch.
     */
    orderBy?: MonthlySnapshotOrderByWithRelationInput | MonthlySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlySnapshots
    **/
    _count?: true | MonthlySnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlySnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlySnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlySnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlySnapshotMaxAggregateInputType
  }

  export type GetMonthlySnapshotAggregateType<T extends MonthlySnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlySnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlySnapshot[P]>
      : GetScalarType<T[P], AggregateMonthlySnapshot[P]>
  }




  export type MonthlySnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlySnapshotWhereInput
    orderBy?: MonthlySnapshotOrderByWithAggregationInput | MonthlySnapshotOrderByWithAggregationInput[]
    by: MonthlySnapshotScalarFieldEnum[] | MonthlySnapshotScalarFieldEnum
    having?: MonthlySnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlySnapshotCountAggregateInputType | true
    _avg?: MonthlySnapshotAvgAggregateInputType
    _sum?: MonthlySnapshotSumAggregateInputType
    _min?: MonthlySnapshotMinAggregateInputType
    _max?: MonthlySnapshotMaxAggregateInputType
  }

  export type MonthlySnapshotGroupByOutputType = {
    id: string
    userId: string
    month: string
    rank: string
    reach: number
    totalReach: number
    engagementRate: number
    commitmentScore: number
    adminGradeScore: number
    approvedSubs: number
    createdAt: Date
    _count: MonthlySnapshotCountAggregateOutputType | null
    _avg: MonthlySnapshotAvgAggregateOutputType | null
    _sum: MonthlySnapshotSumAggregateOutputType | null
    _min: MonthlySnapshotMinAggregateOutputType | null
    _max: MonthlySnapshotMaxAggregateOutputType | null
  }

  type GetMonthlySnapshotGroupByPayload<T extends MonthlySnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlySnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlySnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlySnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlySnapshotGroupByOutputType[P]>
        }
      >
    >


  export type MonthlySnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    month?: boolean
    rank?: boolean
    reach?: boolean
    totalReach?: boolean
    engagementRate?: boolean
    commitmentScore?: boolean
    adminGradeScore?: boolean
    approvedSubs?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlySnapshot"]>



  export type MonthlySnapshotSelectScalar = {
    id?: boolean
    userId?: boolean
    month?: boolean
    rank?: boolean
    reach?: boolean
    totalReach?: boolean
    engagementRate?: boolean
    commitmentScore?: boolean
    adminGradeScore?: boolean
    approvedSubs?: boolean
    createdAt?: boolean
  }

  export type MonthlySnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "month" | "rank" | "reach" | "totalReach" | "engagementRate" | "commitmentScore" | "adminGradeScore" | "approvedSubs" | "createdAt", ExtArgs["result"]["monthlySnapshot"]>
  export type MonthlySnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MonthlySnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlySnapshot"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      month: string
      rank: string
      reach: number
      totalReach: number
      engagementRate: number
      commitmentScore: number
      adminGradeScore: number
      approvedSubs: number
      createdAt: Date
    }, ExtArgs["result"]["monthlySnapshot"]>
    composites: {}
  }

  type MonthlySnapshotGetPayload<S extends boolean | null | undefined | MonthlySnapshotDefaultArgs> = $Result.GetResult<Prisma.$MonthlySnapshotPayload, S>

  type MonthlySnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlySnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlySnapshotCountAggregateInputType | true
    }

  export interface MonthlySnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlySnapshot'], meta: { name: 'MonthlySnapshot' } }
    /**
     * Find zero or one MonthlySnapshot that matches the filter.
     * @param {MonthlySnapshotFindUniqueArgs} args - Arguments to find a MonthlySnapshot
     * @example
     * // Get one MonthlySnapshot
     * const monthlySnapshot = await prisma.monthlySnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlySnapshotFindUniqueArgs>(args: SelectSubset<T, MonthlySnapshotFindUniqueArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlySnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlySnapshotFindUniqueOrThrowArgs} args - Arguments to find a MonthlySnapshot
     * @example
     * // Get one MonthlySnapshot
     * const monthlySnapshot = await prisma.monthlySnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlySnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlySnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlySnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotFindFirstArgs} args - Arguments to find a MonthlySnapshot
     * @example
     * // Get one MonthlySnapshot
     * const monthlySnapshot = await prisma.monthlySnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlySnapshotFindFirstArgs>(args?: SelectSubset<T, MonthlySnapshotFindFirstArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlySnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotFindFirstOrThrowArgs} args - Arguments to find a MonthlySnapshot
     * @example
     * // Get one MonthlySnapshot
     * const monthlySnapshot = await prisma.monthlySnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlySnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlySnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlySnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlySnapshots
     * const monthlySnapshots = await prisma.monthlySnapshot.findMany()
     * 
     * // Get first 10 MonthlySnapshots
     * const monthlySnapshots = await prisma.monthlySnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlySnapshotWithIdOnly = await prisma.monthlySnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlySnapshotFindManyArgs>(args?: SelectSubset<T, MonthlySnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlySnapshot.
     * @param {MonthlySnapshotCreateArgs} args - Arguments to create a MonthlySnapshot.
     * @example
     * // Create one MonthlySnapshot
     * const MonthlySnapshot = await prisma.monthlySnapshot.create({
     *   data: {
     *     // ... data to create a MonthlySnapshot
     *   }
     * })
     * 
     */
    create<T extends MonthlySnapshotCreateArgs>(args: SelectSubset<T, MonthlySnapshotCreateArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlySnapshots.
     * @param {MonthlySnapshotCreateManyArgs} args - Arguments to create many MonthlySnapshots.
     * @example
     * // Create many MonthlySnapshots
     * const monthlySnapshot = await prisma.monthlySnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlySnapshotCreateManyArgs>(args?: SelectSubset<T, MonthlySnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MonthlySnapshot.
     * @param {MonthlySnapshotDeleteArgs} args - Arguments to delete one MonthlySnapshot.
     * @example
     * // Delete one MonthlySnapshot
     * const MonthlySnapshot = await prisma.monthlySnapshot.delete({
     *   where: {
     *     // ... filter to delete one MonthlySnapshot
     *   }
     * })
     * 
     */
    delete<T extends MonthlySnapshotDeleteArgs>(args: SelectSubset<T, MonthlySnapshotDeleteArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlySnapshot.
     * @param {MonthlySnapshotUpdateArgs} args - Arguments to update one MonthlySnapshot.
     * @example
     * // Update one MonthlySnapshot
     * const monthlySnapshot = await prisma.monthlySnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlySnapshotUpdateArgs>(args: SelectSubset<T, MonthlySnapshotUpdateArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlySnapshots.
     * @param {MonthlySnapshotDeleteManyArgs} args - Arguments to filter MonthlySnapshots to delete.
     * @example
     * // Delete a few MonthlySnapshots
     * const { count } = await prisma.monthlySnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlySnapshotDeleteManyArgs>(args?: SelectSubset<T, MonthlySnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlySnapshots
     * const monthlySnapshot = await prisma.monthlySnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlySnapshotUpdateManyArgs>(args: SelectSubset<T, MonthlySnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MonthlySnapshot.
     * @param {MonthlySnapshotUpsertArgs} args - Arguments to update or create a MonthlySnapshot.
     * @example
     * // Update or create a MonthlySnapshot
     * const monthlySnapshot = await prisma.monthlySnapshot.upsert({
     *   create: {
     *     // ... data to create a MonthlySnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlySnapshot we want to update
     *   }
     * })
     */
    upsert<T extends MonthlySnapshotUpsertArgs>(args: SelectSubset<T, MonthlySnapshotUpsertArgs<ExtArgs>>): Prisma__MonthlySnapshotClient<$Result.GetResult<Prisma.$MonthlySnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlySnapshots that matches the filter.
     * @param {MonthlySnapshotFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const monthlySnapshot = await prisma.monthlySnapshot.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MonthlySnapshotFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MonthlySnapshot.
     * @param {MonthlySnapshotAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const monthlySnapshot = await prisma.monthlySnapshot.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MonthlySnapshotAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MonthlySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotCountArgs} args - Arguments to filter MonthlySnapshots to count.
     * @example
     * // Count the number of MonthlySnapshots
     * const count = await prisma.monthlySnapshot.count({
     *   where: {
     *     // ... the filter for the MonthlySnapshots we want to count
     *   }
     * })
    **/
    count<T extends MonthlySnapshotCountArgs>(
      args?: Subset<T, MonthlySnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlySnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MonthlySnapshotAggregateArgs>(args: Subset<T, MonthlySnapshotAggregateArgs>): Prisma.PrismaPromise<GetMonthlySnapshotAggregateType<T>>

    /**
     * Group by MonthlySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlySnapshotGroupByArgs} args - Group by arguments.
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
      T extends MonthlySnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlySnapshotGroupByArgs['orderBy'] }
        : { orderBy?: MonthlySnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MonthlySnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlySnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlySnapshot model
   */
  readonly fields: MonthlySnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlySnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlySnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MonthlySnapshot model
   */
  interface MonthlySnapshotFieldRefs {
    readonly id: FieldRef<"MonthlySnapshot", 'String'>
    readonly userId: FieldRef<"MonthlySnapshot", 'String'>
    readonly month: FieldRef<"MonthlySnapshot", 'String'>
    readonly rank: FieldRef<"MonthlySnapshot", 'String'>
    readonly reach: FieldRef<"MonthlySnapshot", 'Int'>
    readonly totalReach: FieldRef<"MonthlySnapshot", 'Int'>
    readonly engagementRate: FieldRef<"MonthlySnapshot", 'Float'>
    readonly commitmentScore: FieldRef<"MonthlySnapshot", 'Float'>
    readonly adminGradeScore: FieldRef<"MonthlySnapshot", 'Float'>
    readonly approvedSubs: FieldRef<"MonthlySnapshot", 'Int'>
    readonly createdAt: FieldRef<"MonthlySnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlySnapshot findUnique
   */
  export type MonthlySnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MonthlySnapshot to fetch.
     */
    where: MonthlySnapshotWhereUniqueInput
  }

  /**
   * MonthlySnapshot findUniqueOrThrow
   */
  export type MonthlySnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MonthlySnapshot to fetch.
     */
    where: MonthlySnapshotWhereUniqueInput
  }

  /**
   * MonthlySnapshot findFirst
   */
  export type MonthlySnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MonthlySnapshot to fetch.
     */
    where?: MonthlySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlySnapshots to fetch.
     */
    orderBy?: MonthlySnapshotOrderByWithRelationInput | MonthlySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlySnapshots.
     */
    cursor?: MonthlySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlySnapshots.
     */
    distinct?: MonthlySnapshotScalarFieldEnum | MonthlySnapshotScalarFieldEnum[]
  }

  /**
   * MonthlySnapshot findFirstOrThrow
   */
  export type MonthlySnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MonthlySnapshot to fetch.
     */
    where?: MonthlySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlySnapshots to fetch.
     */
    orderBy?: MonthlySnapshotOrderByWithRelationInput | MonthlySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlySnapshots.
     */
    cursor?: MonthlySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlySnapshots.
     */
    distinct?: MonthlySnapshotScalarFieldEnum | MonthlySnapshotScalarFieldEnum[]
  }

  /**
   * MonthlySnapshot findMany
   */
  export type MonthlySnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MonthlySnapshots to fetch.
     */
    where?: MonthlySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlySnapshots to fetch.
     */
    orderBy?: MonthlySnapshotOrderByWithRelationInput | MonthlySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlySnapshots.
     */
    cursor?: MonthlySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlySnapshots.
     */
    skip?: number
    distinct?: MonthlySnapshotScalarFieldEnum | MonthlySnapshotScalarFieldEnum[]
  }

  /**
   * MonthlySnapshot create
   */
  export type MonthlySnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlySnapshot.
     */
    data: XOR<MonthlySnapshotCreateInput, MonthlySnapshotUncheckedCreateInput>
  }

  /**
   * MonthlySnapshot createMany
   */
  export type MonthlySnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlySnapshots.
     */
    data: MonthlySnapshotCreateManyInput | MonthlySnapshotCreateManyInput[]
  }

  /**
   * MonthlySnapshot update
   */
  export type MonthlySnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlySnapshot.
     */
    data: XOR<MonthlySnapshotUpdateInput, MonthlySnapshotUncheckedUpdateInput>
    /**
     * Choose, which MonthlySnapshot to update.
     */
    where: MonthlySnapshotWhereUniqueInput
  }

  /**
   * MonthlySnapshot updateMany
   */
  export type MonthlySnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlySnapshots.
     */
    data: XOR<MonthlySnapshotUpdateManyMutationInput, MonthlySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MonthlySnapshots to update
     */
    where?: MonthlySnapshotWhereInput
    /**
     * Limit how many MonthlySnapshots to update.
     */
    limit?: number
  }

  /**
   * MonthlySnapshot upsert
   */
  export type MonthlySnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlySnapshot to update in case it exists.
     */
    where: MonthlySnapshotWhereUniqueInput
    /**
     * In case the MonthlySnapshot found by the `where` argument doesn't exist, create a new MonthlySnapshot with this data.
     */
    create: XOR<MonthlySnapshotCreateInput, MonthlySnapshotUncheckedCreateInput>
    /**
     * In case the MonthlySnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlySnapshotUpdateInput, MonthlySnapshotUncheckedUpdateInput>
  }

  /**
   * MonthlySnapshot delete
   */
  export type MonthlySnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
    /**
     * Filter which MonthlySnapshot to delete.
     */
    where: MonthlySnapshotWhereUniqueInput
  }

  /**
   * MonthlySnapshot deleteMany
   */
  export type MonthlySnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlySnapshots to delete
     */
    where?: MonthlySnapshotWhereInput
    /**
     * Limit how many MonthlySnapshots to delete.
     */
    limit?: number
  }

  /**
   * MonthlySnapshot findRaw
   */
  export type MonthlySnapshotFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MonthlySnapshot aggregateRaw
   */
  export type MonthlySnapshotAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MonthlySnapshot without action
   */
  export type MonthlySnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlySnapshot
     */
    select?: MonthlySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlySnapshot
     */
    omit?: MonthlySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlySnapshotInclude<ExtArgs> | null
  }


  /**
   * Model PlatformStat
   */

  export type AggregatePlatformStat = {
    _count: PlatformStatCountAggregateOutputType | null
    _avg: PlatformStatAvgAggregateOutputType | null
    _sum: PlatformStatSumAggregateOutputType | null
    _min: PlatformStatMinAggregateOutputType | null
    _max: PlatformStatMaxAggregateOutputType | null
  }

  export type PlatformStatAvgAggregateOutputType = {
    acceptedReach: number | null
    engagementRate: number | null
    qualityRating: number | null
  }

  export type PlatformStatSumAggregateOutputType = {
    acceptedReach: number | null
    engagementRate: number | null
    qualityRating: number | null
  }

  export type PlatformStatMinAggregateOutputType = {
    id: string | null
    userId: string | null
    submissionId: string | null
    platform: string | null
    acceptedReach: number | null
    engagementRate: number | null
    qualityRating: number | null
    rank: string | null
    approvedAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformStatMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    submissionId: string | null
    platform: string | null
    acceptedReach: number | null
    engagementRate: number | null
    qualityRating: number | null
    rank: string | null
    approvedAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformStatCountAggregateOutputType = {
    id: number
    userId: number
    submissionId: number
    platform: number
    contentTypes: number
    acceptedReach: number
    engagementRate: number
    qualityRating: number
    rank: number
    approvedAt: number
    updatedAt: number
    _all: number
  }


  export type PlatformStatAvgAggregateInputType = {
    acceptedReach?: true
    engagementRate?: true
    qualityRating?: true
  }

  export type PlatformStatSumAggregateInputType = {
    acceptedReach?: true
    engagementRate?: true
    qualityRating?: true
  }

  export type PlatformStatMinAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    platform?: true
    acceptedReach?: true
    engagementRate?: true
    qualityRating?: true
    rank?: true
    approvedAt?: true
    updatedAt?: true
  }

  export type PlatformStatMaxAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    platform?: true
    acceptedReach?: true
    engagementRate?: true
    qualityRating?: true
    rank?: true
    approvedAt?: true
    updatedAt?: true
  }

  export type PlatformStatCountAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    platform?: true
    contentTypes?: true
    acceptedReach?: true
    engagementRate?: true
    qualityRating?: true
    rank?: true
    approvedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlatformStatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformStat to aggregate.
     */
    where?: PlatformStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStats to fetch.
     */
    orderBy?: PlatformStatOrderByWithRelationInput | PlatformStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformStats
    **/
    _count?: true | PlatformStatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatformStatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatformStatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformStatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformStatMaxAggregateInputType
  }

  export type GetPlatformStatAggregateType<T extends PlatformStatAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformStat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformStat[P]>
      : GetScalarType<T[P], AggregatePlatformStat[P]>
  }




  export type PlatformStatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformStatWhereInput
    orderBy?: PlatformStatOrderByWithAggregationInput | PlatformStatOrderByWithAggregationInput[]
    by: PlatformStatScalarFieldEnum[] | PlatformStatScalarFieldEnum
    having?: PlatformStatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformStatCountAggregateInputType | true
    _avg?: PlatformStatAvgAggregateInputType
    _sum?: PlatformStatSumAggregateInputType
    _min?: PlatformStatMinAggregateInputType
    _max?: PlatformStatMaxAggregateInputType
  }

  export type PlatformStatGroupByOutputType = {
    id: string
    userId: string
    submissionId: string
    platform: string
    contentTypes: string[]
    acceptedReach: number
    engagementRate: number
    qualityRating: number | null
    rank: string
    approvedAt: Date
    updatedAt: Date
    _count: PlatformStatCountAggregateOutputType | null
    _avg: PlatformStatAvgAggregateOutputType | null
    _sum: PlatformStatSumAggregateOutputType | null
    _min: PlatformStatMinAggregateOutputType | null
    _max: PlatformStatMaxAggregateOutputType | null
  }

  type GetPlatformStatGroupByPayload<T extends PlatformStatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformStatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformStatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformStatGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformStatGroupByOutputType[P]>
        }
      >
    >


  export type PlatformStatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    platform?: boolean
    contentTypes?: boolean
    acceptedReach?: boolean
    engagementRate?: boolean
    qualityRating?: boolean
    rank?: boolean
    approvedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformStat"]>



  export type PlatformStatSelectScalar = {
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    platform?: boolean
    contentTypes?: boolean
    acceptedReach?: boolean
    engagementRate?: boolean
    qualityRating?: boolean
    rank?: boolean
    approvedAt?: boolean
    updatedAt?: boolean
  }

  export type PlatformStatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "submissionId" | "platform" | "contentTypes" | "acceptedReach" | "engagementRate" | "qualityRating" | "rank" | "approvedAt" | "updatedAt", ExtArgs["result"]["platformStat"]>

  export type $PlatformStatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformStat"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      submissionId: string
      platform: string
      contentTypes: string[]
      acceptedReach: number
      engagementRate: number
      qualityRating: number | null
      rank: string
      approvedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["platformStat"]>
    composites: {}
  }

  type PlatformStatGetPayload<S extends boolean | null | undefined | PlatformStatDefaultArgs> = $Result.GetResult<Prisma.$PlatformStatPayload, S>

  type PlatformStatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatformStatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformStatCountAggregateInputType | true
    }

  export interface PlatformStatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformStat'], meta: { name: 'PlatformStat' } }
    /**
     * Find zero or one PlatformStat that matches the filter.
     * @param {PlatformStatFindUniqueArgs} args - Arguments to find a PlatformStat
     * @example
     * // Get one PlatformStat
     * const platformStat = await prisma.platformStat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformStatFindUniqueArgs>(args: SelectSubset<T, PlatformStatFindUniqueArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlatformStat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatformStatFindUniqueOrThrowArgs} args - Arguments to find a PlatformStat
     * @example
     * // Get one PlatformStat
     * const platformStat = await prisma.platformStat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformStatFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformStatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformStat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatFindFirstArgs} args - Arguments to find a PlatformStat
     * @example
     * // Get one PlatformStat
     * const platformStat = await prisma.platformStat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformStatFindFirstArgs>(args?: SelectSubset<T, PlatformStatFindFirstArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformStat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatFindFirstOrThrowArgs} args - Arguments to find a PlatformStat
     * @example
     * // Get one PlatformStat
     * const platformStat = await prisma.platformStat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformStatFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformStatFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlatformStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformStats
     * const platformStats = await prisma.platformStat.findMany()
     * 
     * // Get first 10 PlatformStats
     * const platformStats = await prisma.platformStat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformStatWithIdOnly = await prisma.platformStat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformStatFindManyArgs>(args?: SelectSubset<T, PlatformStatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlatformStat.
     * @param {PlatformStatCreateArgs} args - Arguments to create a PlatformStat.
     * @example
     * // Create one PlatformStat
     * const PlatformStat = await prisma.platformStat.create({
     *   data: {
     *     // ... data to create a PlatformStat
     *   }
     * })
     * 
     */
    create<T extends PlatformStatCreateArgs>(args: SelectSubset<T, PlatformStatCreateArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlatformStats.
     * @param {PlatformStatCreateManyArgs} args - Arguments to create many PlatformStats.
     * @example
     * // Create many PlatformStats
     * const platformStat = await prisma.platformStat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformStatCreateManyArgs>(args?: SelectSubset<T, PlatformStatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PlatformStat.
     * @param {PlatformStatDeleteArgs} args - Arguments to delete one PlatformStat.
     * @example
     * // Delete one PlatformStat
     * const PlatformStat = await prisma.platformStat.delete({
     *   where: {
     *     // ... filter to delete one PlatformStat
     *   }
     * })
     * 
     */
    delete<T extends PlatformStatDeleteArgs>(args: SelectSubset<T, PlatformStatDeleteArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlatformStat.
     * @param {PlatformStatUpdateArgs} args - Arguments to update one PlatformStat.
     * @example
     * // Update one PlatformStat
     * const platformStat = await prisma.platformStat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformStatUpdateArgs>(args: SelectSubset<T, PlatformStatUpdateArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlatformStats.
     * @param {PlatformStatDeleteManyArgs} args - Arguments to filter PlatformStats to delete.
     * @example
     * // Delete a few PlatformStats
     * const { count } = await prisma.platformStat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformStatDeleteManyArgs>(args?: SelectSubset<T, PlatformStatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformStats
     * const platformStat = await prisma.platformStat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformStatUpdateManyArgs>(args: SelectSubset<T, PlatformStatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlatformStat.
     * @param {PlatformStatUpsertArgs} args - Arguments to update or create a PlatformStat.
     * @example
     * // Update or create a PlatformStat
     * const platformStat = await prisma.platformStat.upsert({
     *   create: {
     *     // ... data to create a PlatformStat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformStat we want to update
     *   }
     * })
     */
    upsert<T extends PlatformStatUpsertArgs>(args: SelectSubset<T, PlatformStatUpsertArgs<ExtArgs>>): Prisma__PlatformStatClient<$Result.GetResult<Prisma.$PlatformStatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlatformStats that matches the filter.
     * @param {PlatformStatFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const platformStat = await prisma.platformStat.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PlatformStatFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PlatformStat.
     * @param {PlatformStatAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const platformStat = await prisma.platformStat.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PlatformStatAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of PlatformStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatCountArgs} args - Arguments to filter PlatformStats to count.
     * @example
     * // Count the number of PlatformStats
     * const count = await prisma.platformStat.count({
     *   where: {
     *     // ... the filter for the PlatformStats we want to count
     *   }
     * })
    **/
    count<T extends PlatformStatCountArgs>(
      args?: Subset<T, PlatformStatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformStatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlatformStatAggregateArgs>(args: Subset<T, PlatformStatAggregateArgs>): Prisma.PrismaPromise<GetPlatformStatAggregateType<T>>

    /**
     * Group by PlatformStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStatGroupByArgs} args - Group by arguments.
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
      T extends PlatformStatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformStatGroupByArgs['orderBy'] }
        : { orderBy?: PlatformStatGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlatformStatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformStatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformStat model
   */
  readonly fields: PlatformStatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformStat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformStatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PlatformStat model
   */
  interface PlatformStatFieldRefs {
    readonly id: FieldRef<"PlatformStat", 'String'>
    readonly userId: FieldRef<"PlatformStat", 'String'>
    readonly submissionId: FieldRef<"PlatformStat", 'String'>
    readonly platform: FieldRef<"PlatformStat", 'String'>
    readonly contentTypes: FieldRef<"PlatformStat", 'String[]'>
    readonly acceptedReach: FieldRef<"PlatformStat", 'Int'>
    readonly engagementRate: FieldRef<"PlatformStat", 'Float'>
    readonly qualityRating: FieldRef<"PlatformStat", 'Float'>
    readonly rank: FieldRef<"PlatformStat", 'String'>
    readonly approvedAt: FieldRef<"PlatformStat", 'DateTime'>
    readonly updatedAt: FieldRef<"PlatformStat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformStat findUnique
   */
  export type PlatformStatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStat to fetch.
     */
    where: PlatformStatWhereUniqueInput
  }

  /**
   * PlatformStat findUniqueOrThrow
   */
  export type PlatformStatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStat to fetch.
     */
    where: PlatformStatWhereUniqueInput
  }

  /**
   * PlatformStat findFirst
   */
  export type PlatformStatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStat to fetch.
     */
    where?: PlatformStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStats to fetch.
     */
    orderBy?: PlatformStatOrderByWithRelationInput | PlatformStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformStats.
     */
    cursor?: PlatformStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformStats.
     */
    distinct?: PlatformStatScalarFieldEnum | PlatformStatScalarFieldEnum[]
  }

  /**
   * PlatformStat findFirstOrThrow
   */
  export type PlatformStatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStat to fetch.
     */
    where?: PlatformStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStats to fetch.
     */
    orderBy?: PlatformStatOrderByWithRelationInput | PlatformStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformStats.
     */
    cursor?: PlatformStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformStats.
     */
    distinct?: PlatformStatScalarFieldEnum | PlatformStatScalarFieldEnum[]
  }

  /**
   * PlatformStat findMany
   */
  export type PlatformStatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStats to fetch.
     */
    where?: PlatformStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStats to fetch.
     */
    orderBy?: PlatformStatOrderByWithRelationInput | PlatformStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformStats.
     */
    cursor?: PlatformStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStats.
     */
    skip?: number
    distinct?: PlatformStatScalarFieldEnum | PlatformStatScalarFieldEnum[]
  }

  /**
   * PlatformStat create
   */
  export type PlatformStatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * The data needed to create a PlatformStat.
     */
    data: XOR<PlatformStatCreateInput, PlatformStatUncheckedCreateInput>
  }

  /**
   * PlatformStat createMany
   */
  export type PlatformStatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformStats.
     */
    data: PlatformStatCreateManyInput | PlatformStatCreateManyInput[]
  }

  /**
   * PlatformStat update
   */
  export type PlatformStatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * The data needed to update a PlatformStat.
     */
    data: XOR<PlatformStatUpdateInput, PlatformStatUncheckedUpdateInput>
    /**
     * Choose, which PlatformStat to update.
     */
    where: PlatformStatWhereUniqueInput
  }

  /**
   * PlatformStat updateMany
   */
  export type PlatformStatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformStats.
     */
    data: XOR<PlatformStatUpdateManyMutationInput, PlatformStatUncheckedUpdateManyInput>
    /**
     * Filter which PlatformStats to update
     */
    where?: PlatformStatWhereInput
    /**
     * Limit how many PlatformStats to update.
     */
    limit?: number
  }

  /**
   * PlatformStat upsert
   */
  export type PlatformStatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * The filter to search for the PlatformStat to update in case it exists.
     */
    where: PlatformStatWhereUniqueInput
    /**
     * In case the PlatformStat found by the `where` argument doesn't exist, create a new PlatformStat with this data.
     */
    create: XOR<PlatformStatCreateInput, PlatformStatUncheckedCreateInput>
    /**
     * In case the PlatformStat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformStatUpdateInput, PlatformStatUncheckedUpdateInput>
  }

  /**
   * PlatformStat delete
   */
  export type PlatformStatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
    /**
     * Filter which PlatformStat to delete.
     */
    where: PlatformStatWhereUniqueInput
  }

  /**
   * PlatformStat deleteMany
   */
  export type PlatformStatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformStats to delete
     */
    where?: PlatformStatWhereInput
    /**
     * Limit how many PlatformStats to delete.
     */
    limit?: number
  }

  /**
   * PlatformStat findRaw
   */
  export type PlatformStatFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * PlatformStat aggregateRaw
   */
  export type PlatformStatAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * PlatformStat without action
   */
  export type PlatformStatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStat
     */
    select?: PlatformStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStat
     */
    omit?: PlatformStatOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    email: 'email',
    phone: 'phone',
    phoneKey: 'phoneKey',
    isVerified: 'isVerified',
    isActive: 'isActive',
    role: 'role',
    externalId: 'externalId',
    provider: 'provider',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CreatorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    realName: 'realName',
    contactEmail: 'contactEmail',
    contactPhone: 'contactPhone',
    nickname: 'nickname',
    birthDate: 'birthDate',
    nationality: 'nationality',
    residency: 'residency',
    platforms: 'platforms',
    primarySocialLink: 'primarySocialLink',
    channelLogo: 'channelLogo',
    contentType: 'contentType',
    followers: 'followers',
    eventAttendance: 'eventAttendance',
    discoverySources: 'discoverySources',
    whyJoin: 'whyJoin',
    status: 'status',
    adminNotes: 'adminNotes',
    adminNote: 'adminNote',
    registrationRejection: 'registrationRejection',
    approvedAt: 'approvedAt',
    rank: 'rank',
    currentRankReach: 'currentRankReach',
    totalReachAllTime: 'totalReachAllTime',
    pictureCount: 'pictureCount',
    storyCount: 'storyCount',
    reelCount: 'reelCount',
    longVideoCount: 'longVideoCount',
    postCount: 'postCount',
    totalPictureCount: 'totalPictureCount',
    totalStoryCount: 'totalStoryCount',
    totalReelCount: 'totalReelCount',
    totalLongVideoCount: 'totalLongVideoCount',
    totalPostCount: 'totalPostCount',
    engagementRate: 'engagementRate',
    commitmentScore: 'commitmentScore',
    adminGradeScore: 'adminGradeScore',
    rankedUpAt: 'rankedUpAt',
    isActive: 'isActive',
    joinedAt: 'joinedAt',
    updatedAt: 'updatedAt'
  };

  export type CreatorProfileScalarFieldEnum = (typeof CreatorProfileScalarFieldEnum)[keyof typeof CreatorProfileScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    nickname: 'nickname',
    rank: 'rank',
    platform: 'platform',
    contentLink: 'contentLink',
    contentTypes: 'contentTypes',
    monsterAppearances: 'monsterAppearances',
    submittedReach: 'submittedReach',
    acceptedReach: 'acceptedReach',
    pendingReach: 'pendingReach',
    previousAcceptedReach: 'previousAcceptedReach',
    statsScreenshotUrl: 'statsScreenshotUrl',
    engagementRate: 'engagementRate',
    submittedLikes: 'submittedLikes',
    submittedComments: 'submittedComments',
    submittedShares: 'submittedShares',
    status: 'status',
    adminNotes: 'adminNotes',
    rejectionReason: 'rejectionReason',
    qualityRating: 'qualityRating',
    isEdited: 'isEdited',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const MonthlySnapshotScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    month: 'month',
    rank: 'rank',
    reach: 'reach',
    totalReach: 'totalReach',
    engagementRate: 'engagementRate',
    commitmentScore: 'commitmentScore',
    adminGradeScore: 'adminGradeScore',
    approvedSubs: 'approvedSubs',
    createdAt: 'createdAt'
  };

  export type MonthlySnapshotScalarFieldEnum = (typeof MonthlySnapshotScalarFieldEnum)[keyof typeof MonthlySnapshotScalarFieldEnum]


  export const PlatformStatScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    submissionId: 'submissionId',
    platform: 'platform',
    contentTypes: 'contentTypes',
    acceptedReach: 'acceptedReach',
    engagementRate: 'engagementRate',
    qualityRating: 'qualityRating',
    rank: 'rank',
    approvedAt: 'approvedAt',
    updatedAt: 'updatedAt'
  };

  export type PlatformStatScalarFieldEnum = (typeof PlatformStatScalarFieldEnum)[keyof typeof PlatformStatScalarFieldEnum]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


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
   * Reference to a field of type 'RegistrationStatus'
   */
  export type EnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus'>
    


  /**
   * Reference to a field of type 'RegistrationStatus[]'
   */
  export type ListEnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus[]'>
    


  /**
   * Reference to a field of type 'RegistrationRejectionReason'
   */
  export type EnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationRejectionReason'>
    


  /**
   * Reference to a field of type 'RegistrationRejectionReason[]'
   */
  export type ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationRejectionReason[]'>
    


  /**
   * Reference to a field of type 'CreatorRank'
   */
  export type EnumCreatorRankFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreatorRank'>
    


  /**
   * Reference to a field of type 'CreatorRank[]'
   */
  export type ListEnumCreatorRankFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreatorRank[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


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
   * Reference to a field of type 'SubmissionStatus'
   */
  export type EnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus'>
    


  /**
   * Reference to a field of type 'SubmissionStatus[]'
   */
  export type ListEnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus[]'>
    


  /**
   * Reference to a field of type 'SubmissionRejectionReason'
   */
  export type EnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionRejectionReason'>
    


  /**
   * Reference to a field of type 'SubmissionRejectionReason[]'
   */
  export type ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionRejectionReason[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    phoneKey?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    externalId?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<CreatorProfileNullableScalarRelationFilter, CreatorProfileWhereInput> | null
    submissions?: SubmissionListRelationFilter
    snapshots?: MonthlySnapshotListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: CreatorProfileOrderByWithRelationInput
    submissions?: SubmissionOrderByRelationAggregateInput
    snapshots?: MonthlySnapshotOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phoneKey?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    externalId?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<CreatorProfileNullableScalarRelationFilter, CreatorProfileWhereInput> | null
    submissions?: SubmissionListRelationFilter
    snapshots?: MonthlySnapshotListRelationFilter
  }, "id" | "username" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    externalId?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CreatorProfileWhereInput = {
    AND?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    OR?: CreatorProfileWhereInput[]
    NOT?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    id?: StringFilter<"CreatorProfile"> | string
    userId?: StringFilter<"CreatorProfile"> | string
    realName?: StringFilter<"CreatorProfile"> | string
    contactEmail?: StringNullableFilter<"CreatorProfile"> | string | null
    contactPhone?: StringNullableFilter<"CreatorProfile"> | string | null
    nickname?: StringFilter<"CreatorProfile"> | string
    birthDate?: StringFilter<"CreatorProfile"> | string
    nationality?: StringFilter<"CreatorProfile"> | string
    residency?: StringFilter<"CreatorProfile"> | string
    platforms?: EnumPlatformNullableListFilter<"CreatorProfile">
    platformLinks?: PlatformLinkCompositeListFilter | PlatformLinkObjectEqualityInput[]
    primarySocialLink?: StringFilter<"CreatorProfile"> | string
    channelLogo?: StringNullableFilter<"CreatorProfile"> | string | null
    contentType?: StringFilter<"CreatorProfile"> | string
    followers?: IntFilter<"CreatorProfile"> | number
    eventAttendance?: EnumEventAttendanceFilter<"CreatorProfile"> | $Enums.EventAttendance
    discoverySources?: EnumDiscoverySourceNullableListFilter<"CreatorProfile">
    whyJoin?: StringNullableFilter<"CreatorProfile"> | string | null
    status?: EnumRegistrationStatusFilter<"CreatorProfile"> | $Enums.RegistrationStatus
    adminNotes?: StringNullableFilter<"CreatorProfile"> | string | null
    adminNote?: StringNullableFilter<"CreatorProfile"> | string | null
    registrationRejection?: EnumRegistrationRejectionReasonNullableFilter<"CreatorProfile"> | $Enums.RegistrationRejectionReason | null
    approvedAt?: DateTimeNullableFilter<"CreatorProfile"> | Date | string | null
    rank?: EnumCreatorRankFilter<"CreatorProfile"> | $Enums.CreatorRank
    currentRankReach?: IntFilter<"CreatorProfile"> | number
    totalReachAllTime?: IntFilter<"CreatorProfile"> | number
    pictureCount?: IntFilter<"CreatorProfile"> | number
    storyCount?: IntFilter<"CreatorProfile"> | number
    reelCount?: IntFilter<"CreatorProfile"> | number
    longVideoCount?: IntFilter<"CreatorProfile"> | number
    postCount?: IntFilter<"CreatorProfile"> | number
    totalPictureCount?: IntFilter<"CreatorProfile"> | number
    totalStoryCount?: IntFilter<"CreatorProfile"> | number
    totalReelCount?: IntFilter<"CreatorProfile"> | number
    totalLongVideoCount?: IntFilter<"CreatorProfile"> | number
    totalPostCount?: IntFilter<"CreatorProfile"> | number
    engagementRate?: FloatFilter<"CreatorProfile"> | number
    commitmentScore?: FloatFilter<"CreatorProfile"> | number
    adminGradeScore?: FloatFilter<"CreatorProfile"> | number
    rankedUpAt?: DateTimeNullableFilter<"CreatorProfile"> | Date | string | null
    isActive?: BoolFilter<"CreatorProfile"> | boolean
    joinedAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CreatorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    realName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    nickname?: SortOrder
    birthDate?: SortOrder
    nationality?: SortOrder
    residency?: SortOrder
    platforms?: SortOrder
    platformLinks?: PlatformLinkOrderByCompositeAggregateInput
    primarySocialLink?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    discoverySources?: SortOrder
    whyJoin?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    adminNote?: SortOrder
    registrationRejection?: SortOrder
    approvedAt?: SortOrder
    rank?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    rankedUpAt?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CreatorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    OR?: CreatorProfileWhereInput[]
    NOT?: CreatorProfileWhereInput | CreatorProfileWhereInput[]
    realName?: StringFilter<"CreatorProfile"> | string
    contactEmail?: StringNullableFilter<"CreatorProfile"> | string | null
    contactPhone?: StringNullableFilter<"CreatorProfile"> | string | null
    nickname?: StringFilter<"CreatorProfile"> | string
    birthDate?: StringFilter<"CreatorProfile"> | string
    nationality?: StringFilter<"CreatorProfile"> | string
    residency?: StringFilter<"CreatorProfile"> | string
    platforms?: EnumPlatformNullableListFilter<"CreatorProfile">
    platformLinks?: PlatformLinkCompositeListFilter | PlatformLinkObjectEqualityInput[]
    primarySocialLink?: StringFilter<"CreatorProfile"> | string
    channelLogo?: StringNullableFilter<"CreatorProfile"> | string | null
    contentType?: StringFilter<"CreatorProfile"> | string
    followers?: IntFilter<"CreatorProfile"> | number
    eventAttendance?: EnumEventAttendanceFilter<"CreatorProfile"> | $Enums.EventAttendance
    discoverySources?: EnumDiscoverySourceNullableListFilter<"CreatorProfile">
    whyJoin?: StringNullableFilter<"CreatorProfile"> | string | null
    status?: EnumRegistrationStatusFilter<"CreatorProfile"> | $Enums.RegistrationStatus
    adminNotes?: StringNullableFilter<"CreatorProfile"> | string | null
    adminNote?: StringNullableFilter<"CreatorProfile"> | string | null
    registrationRejection?: EnumRegistrationRejectionReasonNullableFilter<"CreatorProfile"> | $Enums.RegistrationRejectionReason | null
    approvedAt?: DateTimeNullableFilter<"CreatorProfile"> | Date | string | null
    rank?: EnumCreatorRankFilter<"CreatorProfile"> | $Enums.CreatorRank
    currentRankReach?: IntFilter<"CreatorProfile"> | number
    totalReachAllTime?: IntFilter<"CreatorProfile"> | number
    pictureCount?: IntFilter<"CreatorProfile"> | number
    storyCount?: IntFilter<"CreatorProfile"> | number
    reelCount?: IntFilter<"CreatorProfile"> | number
    longVideoCount?: IntFilter<"CreatorProfile"> | number
    postCount?: IntFilter<"CreatorProfile"> | number
    totalPictureCount?: IntFilter<"CreatorProfile"> | number
    totalStoryCount?: IntFilter<"CreatorProfile"> | number
    totalReelCount?: IntFilter<"CreatorProfile"> | number
    totalLongVideoCount?: IntFilter<"CreatorProfile"> | number
    totalPostCount?: IntFilter<"CreatorProfile"> | number
    engagementRate?: FloatFilter<"CreatorProfile"> | number
    commitmentScore?: FloatFilter<"CreatorProfile"> | number
    adminGradeScore?: FloatFilter<"CreatorProfile"> | number
    rankedUpAt?: DateTimeNullableFilter<"CreatorProfile"> | Date | string | null
    isActive?: BoolFilter<"CreatorProfile"> | boolean
    joinedAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CreatorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type CreatorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    realName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    nickname?: SortOrder
    birthDate?: SortOrder
    nationality?: SortOrder
    residency?: SortOrder
    platforms?: SortOrder
    primarySocialLink?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    discoverySources?: SortOrder
    whyJoin?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    adminNote?: SortOrder
    registrationRejection?: SortOrder
    approvedAt?: SortOrder
    rank?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    rankedUpAt?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
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
    realName?: StringWithAggregatesFilter<"CreatorProfile"> | string
    contactEmail?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    contactPhone?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    nickname?: StringWithAggregatesFilter<"CreatorProfile"> | string
    birthDate?: StringWithAggregatesFilter<"CreatorProfile"> | string
    nationality?: StringWithAggregatesFilter<"CreatorProfile"> | string
    residency?: StringWithAggregatesFilter<"CreatorProfile"> | string
    platforms?: EnumPlatformNullableListFilter<"CreatorProfile">
    primarySocialLink?: StringWithAggregatesFilter<"CreatorProfile"> | string
    channelLogo?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    contentType?: StringWithAggregatesFilter<"CreatorProfile"> | string
    followers?: IntWithAggregatesFilter<"CreatorProfile"> | number
    eventAttendance?: EnumEventAttendanceWithAggregatesFilter<"CreatorProfile"> | $Enums.EventAttendance
    discoverySources?: EnumDiscoverySourceNullableListFilter<"CreatorProfile">
    whyJoin?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    status?: EnumRegistrationStatusWithAggregatesFilter<"CreatorProfile"> | $Enums.RegistrationStatus
    adminNotes?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    adminNote?: StringNullableWithAggregatesFilter<"CreatorProfile"> | string | null
    registrationRejection?: EnumRegistrationRejectionReasonNullableWithAggregatesFilter<"CreatorProfile"> | $Enums.RegistrationRejectionReason | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"CreatorProfile"> | Date | string | null
    rank?: EnumCreatorRankWithAggregatesFilter<"CreatorProfile"> | $Enums.CreatorRank
    currentRankReach?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalReachAllTime?: IntWithAggregatesFilter<"CreatorProfile"> | number
    pictureCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    storyCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    reelCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    longVideoCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    postCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalPictureCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalStoryCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalReelCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalLongVideoCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    totalPostCount?: IntWithAggregatesFilter<"CreatorProfile"> | number
    engagementRate?: FloatWithAggregatesFilter<"CreatorProfile"> | number
    commitmentScore?: FloatWithAggregatesFilter<"CreatorProfile"> | number
    adminGradeScore?: FloatWithAggregatesFilter<"CreatorProfile"> | number
    rankedUpAt?: DateTimeNullableWithAggregatesFilter<"CreatorProfile"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"CreatorProfile"> | boolean
    joinedAt?: DateTimeWithAggregatesFilter<"CreatorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreatorProfile"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    nickname?: StringFilter<"Submission"> | string
    rank?: EnumCreatorRankFilter<"Submission"> | $Enums.CreatorRank
    platform?: EnumPlatformFilter<"Submission"> | $Enums.Platform
    contentLink?: StringFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    submittedReach?: IntFilter<"Submission"> | number
    acceptedReach?: IntFilter<"Submission"> | number
    pendingReach?: IntNullableFilter<"Submission"> | number | null
    previousAcceptedReach?: IntNullableFilter<"Submission"> | number | null
    statsScreenshotUrl?: StringNullableFilter<"Submission"> | string | null
    engagementRate?: FloatNullableFilter<"Submission"> | number | null
    submittedLikes?: IntNullableFilter<"Submission"> | number | null
    submittedComments?: IntNullableFilter<"Submission"> | number | null
    submittedShares?: IntNullableFilter<"Submission"> | number | null
    status?: EnumSubmissionStatusFilter<"Submission"> | $Enums.SubmissionStatus
    adminNotes?: StringNullableFilter<"Submission"> | string | null
    rejectionReason?: EnumSubmissionRejectionReasonNullableFilter<"Submission"> | $Enums.SubmissionRejectionReason | null
    qualityRating?: FloatNullableFilter<"Submission"> | number | null
    isEdited?: BoolFilter<"Submission"> | boolean
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    contentTypes?: SortOrder
    monsterAppearances?: SortOrder
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    statsScreenshotUrl?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    rejectionReason?: SortOrder
    qualityRating?: SortOrder
    isEdited?: SortOrder
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
    nickname?: StringFilter<"Submission"> | string
    rank?: EnumCreatorRankFilter<"Submission"> | $Enums.CreatorRank
    platform?: EnumPlatformFilter<"Submission"> | $Enums.Platform
    contentLink?: StringFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    submittedReach?: IntFilter<"Submission"> | number
    acceptedReach?: IntFilter<"Submission"> | number
    pendingReach?: IntNullableFilter<"Submission"> | number | null
    previousAcceptedReach?: IntNullableFilter<"Submission"> | number | null
    statsScreenshotUrl?: StringNullableFilter<"Submission"> | string | null
    engagementRate?: FloatNullableFilter<"Submission"> | number | null
    submittedLikes?: IntNullableFilter<"Submission"> | number | null
    submittedComments?: IntNullableFilter<"Submission"> | number | null
    submittedShares?: IntNullableFilter<"Submission"> | number | null
    status?: EnumSubmissionStatusFilter<"Submission"> | $Enums.SubmissionStatus
    adminNotes?: StringNullableFilter<"Submission"> | string | null
    rejectionReason?: EnumSubmissionRejectionReasonNullableFilter<"Submission"> | $Enums.SubmissionRejectionReason | null
    qualityRating?: FloatNullableFilter<"Submission"> | number | null
    isEdited?: BoolFilter<"Submission"> | boolean
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    contentTypes?: SortOrder
    monsterAppearances?: SortOrder
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    statsScreenshotUrl?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    rejectionReason?: SortOrder
    qualityRating?: SortOrder
    isEdited?: SortOrder
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
    nickname?: StringWithAggregatesFilter<"Submission"> | string
    rank?: EnumCreatorRankWithAggregatesFilter<"Submission"> | $Enums.CreatorRank
    platform?: EnumPlatformWithAggregatesFilter<"Submission"> | $Enums.Platform
    contentLink?: StringWithAggregatesFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    submittedReach?: IntWithAggregatesFilter<"Submission"> | number
    acceptedReach?: IntWithAggregatesFilter<"Submission"> | number
    pendingReach?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    previousAcceptedReach?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    statsScreenshotUrl?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    engagementRate?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
    submittedLikes?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    submittedComments?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    submittedShares?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    status?: EnumSubmissionStatusWithAggregatesFilter<"Submission"> | $Enums.SubmissionStatus
    adminNotes?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    rejectionReason?: EnumSubmissionRejectionReasonNullableWithAggregatesFilter<"Submission"> | $Enums.SubmissionRejectionReason | null
    qualityRating?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
    isEdited?: BoolWithAggregatesFilter<"Submission"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type MonthlySnapshotWhereInput = {
    AND?: MonthlySnapshotWhereInput | MonthlySnapshotWhereInput[]
    OR?: MonthlySnapshotWhereInput[]
    NOT?: MonthlySnapshotWhereInput | MonthlySnapshotWhereInput[]
    id?: StringFilter<"MonthlySnapshot"> | string
    userId?: StringFilter<"MonthlySnapshot"> | string
    month?: StringFilter<"MonthlySnapshot"> | string
    rank?: StringFilter<"MonthlySnapshot"> | string
    reach?: IntFilter<"MonthlySnapshot"> | number
    totalReach?: IntFilter<"MonthlySnapshot"> | number
    engagementRate?: FloatFilter<"MonthlySnapshot"> | number
    commitmentScore?: FloatFilter<"MonthlySnapshot"> | number
    adminGradeScore?: FloatFilter<"MonthlySnapshot"> | number
    approvedSubs?: IntFilter<"MonthlySnapshot"> | number
    createdAt?: DateTimeFilter<"MonthlySnapshot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MonthlySnapshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    month?: SortOrder
    rank?: SortOrder
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MonthlySnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_month?: MonthlySnapshotUserIdMonthCompoundUniqueInput
    AND?: MonthlySnapshotWhereInput | MonthlySnapshotWhereInput[]
    OR?: MonthlySnapshotWhereInput[]
    NOT?: MonthlySnapshotWhereInput | MonthlySnapshotWhereInput[]
    userId?: StringFilter<"MonthlySnapshot"> | string
    month?: StringFilter<"MonthlySnapshot"> | string
    rank?: StringFilter<"MonthlySnapshot"> | string
    reach?: IntFilter<"MonthlySnapshot"> | number
    totalReach?: IntFilter<"MonthlySnapshot"> | number
    engagementRate?: FloatFilter<"MonthlySnapshot"> | number
    commitmentScore?: FloatFilter<"MonthlySnapshot"> | number
    adminGradeScore?: FloatFilter<"MonthlySnapshot"> | number
    approvedSubs?: IntFilter<"MonthlySnapshot"> | number
    createdAt?: DateTimeFilter<"MonthlySnapshot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_month">

  export type MonthlySnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    month?: SortOrder
    rank?: SortOrder
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
    createdAt?: SortOrder
    _count?: MonthlySnapshotCountOrderByAggregateInput
    _avg?: MonthlySnapshotAvgOrderByAggregateInput
    _max?: MonthlySnapshotMaxOrderByAggregateInput
    _min?: MonthlySnapshotMinOrderByAggregateInput
    _sum?: MonthlySnapshotSumOrderByAggregateInput
  }

  export type MonthlySnapshotScalarWhereWithAggregatesInput = {
    AND?: MonthlySnapshotScalarWhereWithAggregatesInput | MonthlySnapshotScalarWhereWithAggregatesInput[]
    OR?: MonthlySnapshotScalarWhereWithAggregatesInput[]
    NOT?: MonthlySnapshotScalarWhereWithAggregatesInput | MonthlySnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlySnapshot"> | string
    userId?: StringWithAggregatesFilter<"MonthlySnapshot"> | string
    month?: StringWithAggregatesFilter<"MonthlySnapshot"> | string
    rank?: StringWithAggregatesFilter<"MonthlySnapshot"> | string
    reach?: IntWithAggregatesFilter<"MonthlySnapshot"> | number
    totalReach?: IntWithAggregatesFilter<"MonthlySnapshot"> | number
    engagementRate?: FloatWithAggregatesFilter<"MonthlySnapshot"> | number
    commitmentScore?: FloatWithAggregatesFilter<"MonthlySnapshot"> | number
    adminGradeScore?: FloatWithAggregatesFilter<"MonthlySnapshot"> | number
    approvedSubs?: IntWithAggregatesFilter<"MonthlySnapshot"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MonthlySnapshot"> | Date | string
  }

  export type PlatformStatWhereInput = {
    AND?: PlatformStatWhereInput | PlatformStatWhereInput[]
    OR?: PlatformStatWhereInput[]
    NOT?: PlatformStatWhereInput | PlatformStatWhereInput[]
    id?: StringFilter<"PlatformStat"> | string
    userId?: StringFilter<"PlatformStat"> | string
    submissionId?: StringFilter<"PlatformStat"> | string
    platform?: StringFilter<"PlatformStat"> | string
    contentTypes?: StringNullableListFilter<"PlatformStat">
    acceptedReach?: IntFilter<"PlatformStat"> | number
    engagementRate?: FloatFilter<"PlatformStat"> | number
    qualityRating?: FloatNullableFilter<"PlatformStat"> | number | null
    rank?: StringFilter<"PlatformStat"> | string
    approvedAt?: DateTimeFilter<"PlatformStat"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformStat"> | Date | string
  }

  export type PlatformStatOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    platform?: SortOrder
    contentTypes?: SortOrder
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
    rank?: SortOrder
    approvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    submissionId?: string
    AND?: PlatformStatWhereInput | PlatformStatWhereInput[]
    OR?: PlatformStatWhereInput[]
    NOT?: PlatformStatWhereInput | PlatformStatWhereInput[]
    userId?: StringFilter<"PlatformStat"> | string
    platform?: StringFilter<"PlatformStat"> | string
    contentTypes?: StringNullableListFilter<"PlatformStat">
    acceptedReach?: IntFilter<"PlatformStat"> | number
    engagementRate?: FloatFilter<"PlatformStat"> | number
    qualityRating?: FloatNullableFilter<"PlatformStat"> | number | null
    rank?: StringFilter<"PlatformStat"> | string
    approvedAt?: DateTimeFilter<"PlatformStat"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformStat"> | Date | string
  }, "id" | "submissionId">

  export type PlatformStatOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    platform?: SortOrder
    contentTypes?: SortOrder
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
    rank?: SortOrder
    approvedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlatformStatCountOrderByAggregateInput
    _avg?: PlatformStatAvgOrderByAggregateInput
    _max?: PlatformStatMaxOrderByAggregateInput
    _min?: PlatformStatMinOrderByAggregateInput
    _sum?: PlatformStatSumOrderByAggregateInput
  }

  export type PlatformStatScalarWhereWithAggregatesInput = {
    AND?: PlatformStatScalarWhereWithAggregatesInput | PlatformStatScalarWhereWithAggregatesInput[]
    OR?: PlatformStatScalarWhereWithAggregatesInput[]
    NOT?: PlatformStatScalarWhereWithAggregatesInput | PlatformStatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformStat"> | string
    userId?: StringWithAggregatesFilter<"PlatformStat"> | string
    submissionId?: StringWithAggregatesFilter<"PlatformStat"> | string
    platform?: StringWithAggregatesFilter<"PlatformStat"> | string
    contentTypes?: StringNullableListFilter<"PlatformStat">
    acceptedReach?: IntWithAggregatesFilter<"PlatformStat"> | number
    engagementRate?: FloatWithAggregatesFilter<"PlatformStat"> | number
    qualityRating?: FloatNullableWithAggregatesFilter<"PlatformStat"> | number | null
    rank?: StringWithAggregatesFilter<"PlatformStat"> | string
    approvedAt?: DateTimeWithAggregatesFilter<"PlatformStat"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlatformStat"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: CreatorProfileCreateNestedOneWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    snapshots?: MonthlySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: CreatorProfileUncheckedCreateNestedOneWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    snapshots?: MonthlySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: CreatorProfileUpdateOneWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    snapshots?: MonthlySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: CreatorProfileUncheckedUpdateOneWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    snapshots?: MonthlySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileCreateInput = {
    id?: string
    realName: string
    contactEmail?: string | null
    contactPhone?: string | null
    nickname: string
    birthDate: string
    nationality: string
    residency: string
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListCreateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink: string
    channelLogo?: string | null
    contentType: string
    followers?: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: string | null
    status?: $Enums.RegistrationStatus
    adminNotes?: string | null
    adminNote?: string | null
    registrationRejection?: $Enums.RegistrationRejectionReason | null
    approvedAt?: Date | string | null
    rank?: $Enums.CreatorRank
    currentRankReach?: number
    totalReachAllTime?: number
    pictureCount?: number
    storyCount?: number
    reelCount?: number
    longVideoCount?: number
    postCount?: number
    totalPictureCount?: number
    totalStoryCount?: number
    totalReelCount?: number
    totalLongVideoCount?: number
    totalPostCount?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    rankedUpAt?: Date | string | null
    isActive?: boolean
    joinedAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type CreatorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    realName: string
    contactEmail?: string | null
    contactPhone?: string | null
    nickname: string
    birthDate: string
    nationality: string
    residency: string
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListCreateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink: string
    channelLogo?: string | null
    contentType: string
    followers?: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: string | null
    status?: $Enums.RegistrationStatus
    adminNotes?: string | null
    adminNote?: string | null
    registrationRejection?: $Enums.RegistrationRejectionReason | null
    approvedAt?: Date | string | null
    rank?: $Enums.CreatorRank
    currentRankReach?: number
    totalReachAllTime?: number
    pictureCount?: number
    storyCount?: number
    reelCount?: number
    longVideoCount?: number
    postCount?: number
    totalPictureCount?: number
    totalStoryCount?: number
    totalReelCount?: number
    totalLongVideoCount?: number
    totalPostCount?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    rankedUpAt?: Date | string | null
    isActive?: boolean
    joinedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileUpdateInput = {
    realName?: StringFieldUpdateOperationsInput | string
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    residency?: StringFieldUpdateOperationsInput | string
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListUpdateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRejection?: NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput | $Enums.RegistrationRejectionReason | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    currentRankReach?: IntFieldUpdateOperationsInput | number
    totalReachAllTime?: IntFieldUpdateOperationsInput | number
    pictureCount?: IntFieldUpdateOperationsInput | number
    storyCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    longVideoCount?: IntFieldUpdateOperationsInput | number
    postCount?: IntFieldUpdateOperationsInput | number
    totalPictureCount?: IntFieldUpdateOperationsInput | number
    totalStoryCount?: IntFieldUpdateOperationsInput | number
    totalReelCount?: IntFieldUpdateOperationsInput | number
    totalLongVideoCount?: IntFieldUpdateOperationsInput | number
    totalPostCount?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    rankedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type CreatorProfileUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    residency?: StringFieldUpdateOperationsInput | string
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListUpdateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRejection?: NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput | $Enums.RegistrationRejectionReason | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    currentRankReach?: IntFieldUpdateOperationsInput | number
    totalReachAllTime?: IntFieldUpdateOperationsInput | number
    pictureCount?: IntFieldUpdateOperationsInput | number
    storyCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    longVideoCount?: IntFieldUpdateOperationsInput | number
    postCount?: IntFieldUpdateOperationsInput | number
    totalPictureCount?: IntFieldUpdateOperationsInput | number
    totalStoryCount?: IntFieldUpdateOperationsInput | number
    totalReelCount?: IntFieldUpdateOperationsInput | number
    totalLongVideoCount?: IntFieldUpdateOperationsInput | number
    totalPostCount?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    rankedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileCreateManyInput = {
    id?: string
    userId: string
    realName: string
    contactEmail?: string | null
    contactPhone?: string | null
    nickname: string
    birthDate: string
    nationality: string
    residency: string
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListCreateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink: string
    channelLogo?: string | null
    contentType: string
    followers?: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: string | null
    status?: $Enums.RegistrationStatus
    adminNotes?: string | null
    adminNote?: string | null
    registrationRejection?: $Enums.RegistrationRejectionReason | null
    approvedAt?: Date | string | null
    rank?: $Enums.CreatorRank
    currentRankReach?: number
    totalReachAllTime?: number
    pictureCount?: number
    storyCount?: number
    reelCount?: number
    longVideoCount?: number
    postCount?: number
    totalPictureCount?: number
    totalStoryCount?: number
    totalReelCount?: number
    totalLongVideoCount?: number
    totalPostCount?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    rankedUpAt?: Date | string | null
    isActive?: boolean
    joinedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileUpdateManyMutationInput = {
    realName?: StringFieldUpdateOperationsInput | string
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    residency?: StringFieldUpdateOperationsInput | string
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListUpdateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRejection?: NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput | $Enums.RegistrationRejectionReason | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    currentRankReach?: IntFieldUpdateOperationsInput | number
    totalReachAllTime?: IntFieldUpdateOperationsInput | number
    pictureCount?: IntFieldUpdateOperationsInput | number
    storyCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    longVideoCount?: IntFieldUpdateOperationsInput | number
    postCount?: IntFieldUpdateOperationsInput | number
    totalPictureCount?: IntFieldUpdateOperationsInput | number
    totalStoryCount?: IntFieldUpdateOperationsInput | number
    totalReelCount?: IntFieldUpdateOperationsInput | number
    totalLongVideoCount?: IntFieldUpdateOperationsInput | number
    totalPostCount?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    rankedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    residency?: StringFieldUpdateOperationsInput | string
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListUpdateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRejection?: NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput | $Enums.RegistrationRejectionReason | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    currentRankReach?: IntFieldUpdateOperationsInput | number
    totalReachAllTime?: IntFieldUpdateOperationsInput | number
    pictureCount?: IntFieldUpdateOperationsInput | number
    storyCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    longVideoCount?: IntFieldUpdateOperationsInput | number
    postCount?: IntFieldUpdateOperationsInput | number
    totalPictureCount?: IntFieldUpdateOperationsInput | number
    totalStoryCount?: IntFieldUpdateOperationsInput | number
    totalReelCount?: IntFieldUpdateOperationsInput | number
    totalLongVideoCount?: IntFieldUpdateOperationsInput | number
    totalPostCount?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    rankedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    id?: string
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: number
    acceptedReach?: number
    pendingReach?: number | null
    previousAcceptedReach?: number | null
    statsScreenshotUrl?: string | null
    engagementRate?: number | null
    submittedLikes?: number | null
    submittedComments?: number | null
    submittedShares?: number | null
    status?: $Enums.SubmissionStatus
    adminNotes?: string | null
    rejectionReason?: $Enums.SubmissionRejectionReason | null
    qualityRating?: number | null
    isEdited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    userId: string
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: number
    acceptedReach?: number
    pendingReach?: number | null
    previousAcceptedReach?: number | null
    statsScreenshotUrl?: string | null
    engagementRate?: number | null
    submittedLikes?: number | null
    submittedComments?: number | null
    submittedShares?: number | null
    status?: $Enums.SubmissionStatus
    adminNotes?: string | null
    rejectionReason?: $Enums.SubmissionRejectionReason | null
    qualityRating?: number | null
    isEdited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyInput = {
    id?: string
    userId: string
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: number
    acceptedReach?: number
    pendingReach?: number | null
    previousAcceptedReach?: number | null
    statsScreenshotUrl?: string | null
    engagementRate?: number | null
    submittedLikes?: number | null
    submittedComments?: number | null
    submittedShares?: number | null
    status?: $Enums.SubmissionStatus
    adminNotes?: string | null
    rejectionReason?: $Enums.SubmissionRejectionReason | null
    qualityRating?: number | null
    isEdited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlySnapshotCreateInput = {
    id?: string
    month: string
    rank: string
    reach?: number
    totalReach?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    approvedSubs?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSnapshotsInput
  }

  export type MonthlySnapshotUncheckedCreateInput = {
    id?: string
    userId: string
    month: string
    rank: string
    reach?: number
    totalReach?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    approvedSubs?: number
    createdAt?: Date | string
  }

  export type MonthlySnapshotUpdateInput = {
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type MonthlySnapshotUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlySnapshotCreateManyInput = {
    id?: string
    userId: string
    month: string
    rank: string
    reach?: number
    totalReach?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    approvedSubs?: number
    createdAt?: Date | string
  }

  export type MonthlySnapshotUpdateManyMutationInput = {
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlySnapshotUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStatCreateInput = {
    id?: string
    userId: string
    submissionId: string
    platform: string
    contentTypes?: PlatformStatCreatecontentTypesInput | string[]
    acceptedReach?: number
    engagementRate?: number
    qualityRating?: number | null
    rank: string
    approvedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformStatUncheckedCreateInput = {
    id?: string
    userId: string
    submissionId: string
    platform: string
    contentTypes?: PlatformStatCreatecontentTypesInput | string[]
    acceptedReach?: number
    engagementRate?: number
    qualityRating?: number | null
    rank: string
    approvedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformStatUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentTypes?: PlatformStatUpdatecontentTypesInput | string[]
    acceptedReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    rank?: StringFieldUpdateOperationsInput | string
    approvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStatUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentTypes?: PlatformStatUpdatecontentTypesInput | string[]
    acceptedReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    rank?: StringFieldUpdateOperationsInput | string
    approvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStatCreateManyInput = {
    id?: string
    userId: string
    submissionId: string
    platform: string
    contentTypes?: PlatformStatCreatecontentTypesInput | string[]
    acceptedReach?: number
    engagementRate?: number
    qualityRating?: number | null
    rank: string
    approvedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformStatUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentTypes?: PlatformStatUpdatecontentTypesInput | string[]
    acceptedReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    rank?: StringFieldUpdateOperationsInput | string
    approvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStatUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentTypes?: PlatformStatUpdatecontentTypesInput | string[]
    acceptedReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    rank?: StringFieldUpdateOperationsInput | string
    approvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type CreatorProfileNullableScalarRelationFilter = {
    is?: CreatorProfileWhereInput | null
    isNot?: CreatorProfileWhereInput | null
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type MonthlySnapshotListRelationFilter = {
    every?: MonthlySnapshotWhereInput
    some?: MonthlySnapshotWhereInput
    none?: MonthlySnapshotWhereInput
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlySnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phoneKey?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    role?: SortOrder
    externalId?: SortOrder
    provider?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type EnumPlatformNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel> | null
    has?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PlatformLinkCompositeListFilter = {
    equals?: PlatformLinkObjectEqualityInput[]
    every?: PlatformLinkWhereInput
    some?: PlatformLinkWhereInput
    none?: PlatformLinkWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type PlatformLinkObjectEqualityInput = {
    platform: $Enums.Platform
    url: string
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

  export type EnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type EnumRegistrationRejectionReasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationRejectionReason | EnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel> | $Enums.RegistrationRejectionReason | null
    isSet?: boolean
  }

  export type EnumCreatorRankFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorRank | EnumCreatorRankFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorRankFilter<$PrismaModel> | $Enums.CreatorRank
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PlatformLinkOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    realName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    nickname?: SortOrder
    birthDate?: SortOrder
    nationality?: SortOrder
    residency?: SortOrder
    platforms?: SortOrder
    primarySocialLink?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    discoverySources?: SortOrder
    whyJoin?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    adminNote?: SortOrder
    registrationRejection?: SortOrder
    approvedAt?: SortOrder
    rank?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    rankedUpAt?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorProfileAvgOrderByAggregateInput = {
    followers?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
  }

  export type CreatorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    realName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    nickname?: SortOrder
    birthDate?: SortOrder
    nationality?: SortOrder
    residency?: SortOrder
    primarySocialLink?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    whyJoin?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    adminNote?: SortOrder
    registrationRejection?: SortOrder
    approvedAt?: SortOrder
    rank?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    rankedUpAt?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    realName?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    nickname?: SortOrder
    birthDate?: SortOrder
    nationality?: SortOrder
    residency?: SortOrder
    primarySocialLink?: SortOrder
    channelLogo?: SortOrder
    contentType?: SortOrder
    followers?: SortOrder
    eventAttendance?: SortOrder
    whyJoin?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    adminNote?: SortOrder
    registrationRejection?: SortOrder
    approvedAt?: SortOrder
    rank?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    rankedUpAt?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreatorProfileSumOrderByAggregateInput = {
    followers?: SortOrder
    currentRankReach?: SortOrder
    totalReachAllTime?: SortOrder
    pictureCount?: SortOrder
    storyCount?: SortOrder
    reelCount?: SortOrder
    longVideoCount?: SortOrder
    postCount?: SortOrder
    totalPictureCount?: SortOrder
    totalStoryCount?: SortOrder
    totalReelCount?: SortOrder
    totalLongVideoCount?: SortOrder
    totalPostCount?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
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

  export type EnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type EnumRegistrationRejectionReasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationRejectionReason | EnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegistrationRejectionReasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationRejectionReason | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel>
    _max?: NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumCreatorRankWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorRank | EnumCreatorRankFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorRankWithAggregatesFilter<$PrismaModel> | $Enums.CreatorRank
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreatorRankFilter<$PrismaModel>
    _max?: NestedEnumCreatorRankFilter<$PrismaModel>
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

  export type FloatNullableFilter<$PrismaModel = never> = {
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

  export type EnumSubmissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusFilter<$PrismaModel> | $Enums.SubmissionStatus
  }

  export type EnumSubmissionRejectionReasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionRejectionReason | EnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel> | $Enums.SubmissionRejectionReason | null
    isSet?: boolean
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    contentTypes?: SortOrder
    monsterAppearances?: SortOrder
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    statsScreenshotUrl?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    rejectionReason?: SortOrder
    qualityRating?: SortOrder
    isEdited?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    qualityRating?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    statsScreenshotUrl?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    rejectionReason?: SortOrder
    qualityRating?: SortOrder
    isEdited?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    platform?: SortOrder
    contentLink?: SortOrder
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    statsScreenshotUrl?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    rejectionReason?: SortOrder
    qualityRating?: SortOrder
    isEdited?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    submittedReach?: SortOrder
    acceptedReach?: SortOrder
    pendingReach?: SortOrder
    previousAcceptedReach?: SortOrder
    engagementRate?: SortOrder
    submittedLikes?: SortOrder
    submittedComments?: SortOrder
    submittedShares?: SortOrder
    qualityRating?: SortOrder
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type EnumSubmissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusFilter<$PrismaModel>
  }

  export type EnumSubmissionRejectionReasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionRejectionReason | EnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionRejectionReasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionRejectionReason | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel>
    _max?: NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type MonthlySnapshotUserIdMonthCompoundUniqueInput = {
    userId: string
    month: string
  }

  export type MonthlySnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    month?: SortOrder
    rank?: SortOrder
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlySnapshotAvgOrderByAggregateInput = {
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
  }

  export type MonthlySnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    month?: SortOrder
    rank?: SortOrder
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlySnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    month?: SortOrder
    rank?: SortOrder
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlySnapshotSumOrderByAggregateInput = {
    reach?: SortOrder
    totalReach?: SortOrder
    engagementRate?: SortOrder
    commitmentScore?: SortOrder
    adminGradeScore?: SortOrder
    approvedSubs?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PlatformStatCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    platform?: SortOrder
    contentTypes?: SortOrder
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
    rank?: SortOrder
    approvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStatAvgOrderByAggregateInput = {
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
  }

  export type PlatformStatMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    platform?: SortOrder
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
    rank?: SortOrder
    approvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStatMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    platform?: SortOrder
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
    rank?: SortOrder
    approvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStatSumOrderByAggregateInput = {
    acceptedReach?: SortOrder
    engagementRate?: SortOrder
    qualityRating?: SortOrder
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

  export type MonthlySnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlySnapshotCreateWithoutUserInput, MonthlySnapshotUncheckedCreateWithoutUserInput> | MonthlySnapshotCreateWithoutUserInput[] | MonthlySnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlySnapshotCreateOrConnectWithoutUserInput | MonthlySnapshotCreateOrConnectWithoutUserInput[]
    createMany?: MonthlySnapshotCreateManyUserInputEnvelope
    connect?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
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

  export type MonthlySnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlySnapshotCreateWithoutUserInput, MonthlySnapshotUncheckedCreateWithoutUserInput> | MonthlySnapshotCreateWithoutUserInput[] | MonthlySnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlySnapshotCreateOrConnectWithoutUserInput | MonthlySnapshotCreateOrConnectWithoutUserInput[]
    createMany?: MonthlySnapshotCreateManyUserInputEnvelope
    connect?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type MonthlySnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlySnapshotCreateWithoutUserInput, MonthlySnapshotUncheckedCreateWithoutUserInput> | MonthlySnapshotCreateWithoutUserInput[] | MonthlySnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlySnapshotCreateOrConnectWithoutUserInput | MonthlySnapshotCreateOrConnectWithoutUserInput[]
    upsert?: MonthlySnapshotUpsertWithWhereUniqueWithoutUserInput | MonthlySnapshotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlySnapshotCreateManyUserInputEnvelope
    set?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    disconnect?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    delete?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    connect?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    update?: MonthlySnapshotUpdateWithWhereUniqueWithoutUserInput | MonthlySnapshotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlySnapshotUpdateManyWithWhereWithoutUserInput | MonthlySnapshotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlySnapshotScalarWhereInput | MonthlySnapshotScalarWhereInput[]
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

  export type MonthlySnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlySnapshotCreateWithoutUserInput, MonthlySnapshotUncheckedCreateWithoutUserInput> | MonthlySnapshotCreateWithoutUserInput[] | MonthlySnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlySnapshotCreateOrConnectWithoutUserInput | MonthlySnapshotCreateOrConnectWithoutUserInput[]
    upsert?: MonthlySnapshotUpsertWithWhereUniqueWithoutUserInput | MonthlySnapshotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlySnapshotCreateManyUserInputEnvelope
    set?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    disconnect?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    delete?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    connect?: MonthlySnapshotWhereUniqueInput | MonthlySnapshotWhereUniqueInput[]
    update?: MonthlySnapshotUpdateWithWhereUniqueWithoutUserInput | MonthlySnapshotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlySnapshotUpdateManyWithWhereWithoutUserInput | MonthlySnapshotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlySnapshotScalarWhereInput | MonthlySnapshotScalarWhereInput[]
  }

  export type CreatorProfileCreateplatformsInput = {
    set: $Enums.Platform[]
  }

  export type PlatformLinkListCreateEnvelopeInput = {
    set?: PlatformLinkCreateInput | PlatformLinkCreateInput[]
  }

  export type PlatformLinkCreateInput = {
    platform: $Enums.Platform
    url: string
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

  export type PlatformLinkListUpdateEnvelopeInput = {
    set?: PlatformLinkCreateInput | PlatformLinkCreateInput[]
    push?: PlatformLinkCreateInput | PlatformLinkCreateInput[]
    updateMany?: PlatformLinkUpdateManyInput
    deleteMany?: PlatformLinkDeleteManyInput
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

  export type EnumRegistrationStatusFieldUpdateOperationsInput = {
    set?: $Enums.RegistrationStatus
  }

  export type NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput = {
    set?: $Enums.RegistrationRejectionReason | null
    unset?: boolean
  }

  export type EnumCreatorRankFieldUpdateOperationsInput = {
    set?: $Enums.CreatorRank
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type EnumSubmissionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubmissionStatus
  }

  export type NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput = {
    set?: $Enums.SubmissionRejectionReason | null
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<UserCreateWithoutSnapshotsInput, UserUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSnapshotsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<UserCreateWithoutSnapshotsInput, UserUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSnapshotsInput
    upsert?: UserUpsertWithoutSnapshotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSnapshotsInput, UserUpdateWithoutSnapshotsInput>, UserUncheckedUpdateWithoutSnapshotsInput>
  }

  export type PlatformStatCreatecontentTypesInput = {
    set: string[]
  }

  export type PlatformStatUpdatecontentTypesInput = {
    set?: string[]
    push?: string | string[]
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type PlatformLinkWhereInput = {
    AND?: PlatformLinkWhereInput | PlatformLinkWhereInput[]
    OR?: PlatformLinkWhereInput[]
    NOT?: PlatformLinkWhereInput | PlatformLinkWhereInput[]
    platform?: EnumPlatformFilter<"PlatformLink"> | $Enums.Platform
    url?: StringFilter<"PlatformLink"> | string
  }

  export type NestedEnumEventAttendanceFilter<$PrismaModel = never> = {
    equals?: $Enums.EventAttendance | EnumEventAttendanceFieldRefInput<$PrismaModel>
    in?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventAttendance[] | ListEnumEventAttendanceFieldRefInput<$PrismaModel>
    not?: NestedEnumEventAttendanceFilter<$PrismaModel> | $Enums.EventAttendance
  }

  export type NestedEnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationRejectionReason | EnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel> | $Enums.RegistrationRejectionReason | null
    isSet?: boolean
  }

  export type NestedEnumCreatorRankFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorRank | EnumCreatorRankFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorRankFilter<$PrismaModel> | $Enums.CreatorRank
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

  export type NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type NestedEnumRegistrationRejectionReasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationRejectionReason | EnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RegistrationRejectionReason[] | ListEnumRegistrationRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegistrationRejectionReasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationRejectionReason | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel>
    _max?: NestedEnumRegistrationRejectionReasonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumCreatorRankWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreatorRank | EnumCreatorRankFieldRefInput<$PrismaModel>
    in?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreatorRank[] | ListEnumCreatorRankFieldRefInput<$PrismaModel>
    not?: NestedEnumCreatorRankWithAggregatesFilter<$PrismaModel> | $Enums.CreatorRank
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreatorRankFilter<$PrismaModel>
    _max?: NestedEnumCreatorRankFilter<$PrismaModel>
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

  export type NestedEnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
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

  export type NestedEnumSubmissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusFilter<$PrismaModel> | $Enums.SubmissionStatus
  }

  export type NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionRejectionReason | EnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel> | $Enums.SubmissionRejectionReason | null
    isSet?: boolean
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusFilter<$PrismaModel>
  }

  export type NestedEnumSubmissionRejectionReasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionRejectionReason | EnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionRejectionReason[] | ListEnumSubmissionRejectionReasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionRejectionReasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionRejectionReason | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel>
    _max?: NestedEnumSubmissionRejectionReasonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type CreatorProfileCreateWithoutUserInput = {
    id?: string
    realName: string
    contactEmail?: string | null
    contactPhone?: string | null
    nickname: string
    birthDate: string
    nationality: string
    residency: string
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListCreateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink: string
    channelLogo?: string | null
    contentType: string
    followers?: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: string | null
    status?: $Enums.RegistrationStatus
    adminNotes?: string | null
    adminNote?: string | null
    registrationRejection?: $Enums.RegistrationRejectionReason | null
    approvedAt?: Date | string | null
    rank?: $Enums.CreatorRank
    currentRankReach?: number
    totalReachAllTime?: number
    pictureCount?: number
    storyCount?: number
    reelCount?: number
    longVideoCount?: number
    postCount?: number
    totalPictureCount?: number
    totalStoryCount?: number
    totalReelCount?: number
    totalLongVideoCount?: number
    totalPostCount?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    rankedUpAt?: Date | string | null
    isActive?: boolean
    joinedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    realName: string
    contactEmail?: string | null
    contactPhone?: string | null
    nickname: string
    birthDate: string
    nationality: string
    residency: string
    platforms?: CreatorProfileCreateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListCreateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink: string
    channelLogo?: string | null
    contentType: string
    followers?: number
    eventAttendance: $Enums.EventAttendance
    discoverySources?: CreatorProfileCreatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: string | null
    status?: $Enums.RegistrationStatus
    adminNotes?: string | null
    adminNote?: string | null
    registrationRejection?: $Enums.RegistrationRejectionReason | null
    approvedAt?: Date | string | null
    rank?: $Enums.CreatorRank
    currentRankReach?: number
    totalReachAllTime?: number
    pictureCount?: number
    storyCount?: number
    reelCount?: number
    longVideoCount?: number
    postCount?: number
    totalPictureCount?: number
    totalStoryCount?: number
    totalReelCount?: number
    totalLongVideoCount?: number
    totalPostCount?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    rankedUpAt?: Date | string | null
    isActive?: boolean
    joinedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreatorProfileCreateOrConnectWithoutUserInput = {
    where: CreatorProfileWhereUniqueInput
    create: XOR<CreatorProfileCreateWithoutUserInput, CreatorProfileUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateWithoutUserInput = {
    id?: string
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: number
    acceptedReach?: number
    pendingReach?: number | null
    previousAcceptedReach?: number | null
    statsScreenshotUrl?: string | null
    engagementRate?: number | null
    submittedLikes?: number | null
    submittedComments?: number | null
    submittedShares?: number | null
    status?: $Enums.SubmissionStatus
    adminNotes?: string | null
    rejectionReason?: $Enums.SubmissionRejectionReason | null
    qualityRating?: number | null
    isEdited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: number
    acceptedReach?: number
    pendingReach?: number | null
    previousAcceptedReach?: number | null
    statsScreenshotUrl?: string | null
    engagementRate?: number | null
    submittedLikes?: number | null
    submittedComments?: number | null
    submittedShares?: number | null
    status?: $Enums.SubmissionStatus
    adminNotes?: string | null
    rejectionReason?: $Enums.SubmissionRejectionReason | null
    qualityRating?: number | null
    isEdited?: boolean
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

  export type MonthlySnapshotCreateWithoutUserInput = {
    id?: string
    month: string
    rank: string
    reach?: number
    totalReach?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    approvedSubs?: number
    createdAt?: Date | string
  }

  export type MonthlySnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    month: string
    rank: string
    reach?: number
    totalReach?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    approvedSubs?: number
    createdAt?: Date | string
  }

  export type MonthlySnapshotCreateOrConnectWithoutUserInput = {
    where: MonthlySnapshotWhereUniqueInput
    create: XOR<MonthlySnapshotCreateWithoutUserInput, MonthlySnapshotUncheckedCreateWithoutUserInput>
  }

  export type MonthlySnapshotCreateManyUserInputEnvelope = {
    data: MonthlySnapshotCreateManyUserInput | MonthlySnapshotCreateManyUserInput[]
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
    realName?: StringFieldUpdateOperationsInput | string
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    residency?: StringFieldUpdateOperationsInput | string
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListUpdateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRejection?: NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput | $Enums.RegistrationRejectionReason | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    currentRankReach?: IntFieldUpdateOperationsInput | number
    totalReachAllTime?: IntFieldUpdateOperationsInput | number
    pictureCount?: IntFieldUpdateOperationsInput | number
    storyCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    longVideoCount?: IntFieldUpdateOperationsInput | number
    postCount?: IntFieldUpdateOperationsInput | number
    totalPictureCount?: IntFieldUpdateOperationsInput | number
    totalStoryCount?: IntFieldUpdateOperationsInput | number
    totalReelCount?: IntFieldUpdateOperationsInput | number
    totalLongVideoCount?: IntFieldUpdateOperationsInput | number
    totalPostCount?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    rankedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreatorProfileUncheckedUpdateWithoutUserInput = {
    realName?: StringFieldUpdateOperationsInput | string
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    residency?: StringFieldUpdateOperationsInput | string
    platforms?: CreatorProfileUpdateplatformsInput | $Enums.Platform[]
    platformLinks?: XOR<PlatformLinkListUpdateEnvelopeInput, PlatformLinkCreateInput> | PlatformLinkCreateInput[]
    primarySocialLink?: StringFieldUpdateOperationsInput | string
    channelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    eventAttendance?: EnumEventAttendanceFieldUpdateOperationsInput | $Enums.EventAttendance
    discoverySources?: CreatorProfileUpdatediscoverySourcesInput | $Enums.DiscoverySource[]
    whyJoin?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRejection?: NullableEnumRegistrationRejectionReasonFieldUpdateOperationsInput | $Enums.RegistrationRejectionReason | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    currentRankReach?: IntFieldUpdateOperationsInput | number
    totalReachAllTime?: IntFieldUpdateOperationsInput | number
    pictureCount?: IntFieldUpdateOperationsInput | number
    storyCount?: IntFieldUpdateOperationsInput | number
    reelCount?: IntFieldUpdateOperationsInput | number
    longVideoCount?: IntFieldUpdateOperationsInput | number
    postCount?: IntFieldUpdateOperationsInput | number
    totalPictureCount?: IntFieldUpdateOperationsInput | number
    totalStoryCount?: IntFieldUpdateOperationsInput | number
    totalReelCount?: IntFieldUpdateOperationsInput | number
    totalLongVideoCount?: IntFieldUpdateOperationsInput | number
    totalPostCount?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    rankedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    nickname?: StringFilter<"Submission"> | string
    rank?: EnumCreatorRankFilter<"Submission"> | $Enums.CreatorRank
    platform?: EnumPlatformFilter<"Submission"> | $Enums.Platform
    contentLink?: StringFilter<"Submission"> | string
    contentTypes?: EnumContentTypeNullableListFilter<"Submission">
    monsterAppearances?: EnumMonsterAppearanceNullableListFilter<"Submission">
    submittedReach?: IntFilter<"Submission"> | number
    acceptedReach?: IntFilter<"Submission"> | number
    pendingReach?: IntNullableFilter<"Submission"> | number | null
    previousAcceptedReach?: IntNullableFilter<"Submission"> | number | null
    statsScreenshotUrl?: StringNullableFilter<"Submission"> | string | null
    engagementRate?: FloatNullableFilter<"Submission"> | number | null
    submittedLikes?: IntNullableFilter<"Submission"> | number | null
    submittedComments?: IntNullableFilter<"Submission"> | number | null
    submittedShares?: IntNullableFilter<"Submission"> | number | null
    status?: EnumSubmissionStatusFilter<"Submission"> | $Enums.SubmissionStatus
    adminNotes?: StringNullableFilter<"Submission"> | string | null
    rejectionReason?: EnumSubmissionRejectionReasonNullableFilter<"Submission"> | $Enums.SubmissionRejectionReason | null
    qualityRating?: FloatNullableFilter<"Submission"> | number | null
    isEdited?: BoolFilter<"Submission"> | boolean
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type MonthlySnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: MonthlySnapshotWhereUniqueInput
    update: XOR<MonthlySnapshotUpdateWithoutUserInput, MonthlySnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<MonthlySnapshotCreateWithoutUserInput, MonthlySnapshotUncheckedCreateWithoutUserInput>
  }

  export type MonthlySnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: MonthlySnapshotWhereUniqueInput
    data: XOR<MonthlySnapshotUpdateWithoutUserInput, MonthlySnapshotUncheckedUpdateWithoutUserInput>
  }

  export type MonthlySnapshotUpdateManyWithWhereWithoutUserInput = {
    where: MonthlySnapshotScalarWhereInput
    data: XOR<MonthlySnapshotUpdateManyMutationInput, MonthlySnapshotUncheckedUpdateManyWithoutUserInput>
  }

  export type MonthlySnapshotScalarWhereInput = {
    AND?: MonthlySnapshotScalarWhereInput | MonthlySnapshotScalarWhereInput[]
    OR?: MonthlySnapshotScalarWhereInput[]
    NOT?: MonthlySnapshotScalarWhereInput | MonthlySnapshotScalarWhereInput[]
    id?: StringFilter<"MonthlySnapshot"> | string
    userId?: StringFilter<"MonthlySnapshot"> | string
    month?: StringFilter<"MonthlySnapshot"> | string
    rank?: StringFilter<"MonthlySnapshot"> | string
    reach?: IntFilter<"MonthlySnapshot"> | number
    totalReach?: IntFilter<"MonthlySnapshot"> | number
    engagementRate?: FloatFilter<"MonthlySnapshot"> | number
    commitmentScore?: FloatFilter<"MonthlySnapshot"> | number
    adminGradeScore?: FloatFilter<"MonthlySnapshot"> | number
    approvedSubs?: IntFilter<"MonthlySnapshot"> | number
    createdAt?: DateTimeFilter<"MonthlySnapshot"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    snapshots?: MonthlySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    snapshots?: MonthlySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type PlatformLinkUpdateManyInput = {
    where: PlatformLinkWhereInput
    data: PlatformLinkUpdateInput
  }

  export type PlatformLinkDeleteManyInput = {
    where: PlatformLinkWhereInput
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
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    snapshots?: MonthlySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    snapshots?: MonthlySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: CreatorProfileCreateNestedOneWithoutUserInput
    snapshots?: MonthlySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: CreatorProfileUncheckedCreateNestedOneWithoutUserInput
    snapshots?: MonthlySnapshotUncheckedCreateNestedManyWithoutUserInput
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
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: CreatorProfileUpdateOneWithoutUserNestedInput
    snapshots?: MonthlySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: CreatorProfileUncheckedUpdateOneWithoutUserNestedInput
    snapshots?: MonthlySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSnapshotsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: CreatorProfileCreateNestedOneWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSnapshotsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email?: string | null
    phone?: string | null
    phoneKey?: string | null
    isVerified?: boolean
    isActive?: boolean
    role?: $Enums.UserRole
    externalId?: string | null
    provider?: string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: CreatorProfileUncheckedCreateNestedOneWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSnapshotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSnapshotsInput, UserUncheckedCreateWithoutSnapshotsInput>
  }

  export type UserUpsertWithoutSnapshotsInput = {
    update: XOR<UserUpdateWithoutSnapshotsInput, UserUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<UserCreateWithoutSnapshotsInput, UserUncheckedCreateWithoutSnapshotsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSnapshotsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSnapshotsInput, UserUncheckedUpdateWithoutSnapshotsInput>
  }

  export type UserUpdateWithoutSnapshotsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: CreatorProfileUpdateOneWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSnapshotsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneKey?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: CreatorProfileUncheckedUpdateOneWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubmissionCreateManyUserInput = {
    id?: string
    nickname: string
    rank: $Enums.CreatorRank
    platform: $Enums.Platform
    contentLink: string
    contentTypes?: SubmissionCreatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionCreatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: number
    acceptedReach?: number
    pendingReach?: number | null
    previousAcceptedReach?: number | null
    statsScreenshotUrl?: string | null
    engagementRate?: number | null
    submittedLikes?: number | null
    submittedComments?: number | null
    submittedShares?: number | null
    status?: $Enums.SubmissionStatus
    adminNotes?: string | null
    rejectionReason?: $Enums.SubmissionRejectionReason | null
    qualityRating?: number | null
    isEdited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlySnapshotCreateManyUserInput = {
    id?: string
    month: string
    rank: string
    reach?: number
    totalReach?: number
    engagementRate?: number
    commitmentScore?: number
    adminGradeScore?: number
    approvedSubs?: number
    createdAt?: Date | string
  }

  export type SubmissionUpdateWithoutUserInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateWithoutUserInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutUserInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    rank?: EnumCreatorRankFieldUpdateOperationsInput | $Enums.CreatorRank
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    contentLink?: StringFieldUpdateOperationsInput | string
    contentTypes?: SubmissionUpdatecontentTypesInput | $Enums.ContentType[]
    monsterAppearances?: SubmissionUpdatemonsterAppearancesInput | $Enums.MonsterAppearance[]
    submittedReach?: IntFieldUpdateOperationsInput | number
    acceptedReach?: IntFieldUpdateOperationsInput | number
    pendingReach?: NullableIntFieldUpdateOperationsInput | number | null
    previousAcceptedReach?: NullableIntFieldUpdateOperationsInput | number | null
    statsScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    engagementRate?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedLikes?: NullableIntFieldUpdateOperationsInput | number | null
    submittedComments?: NullableIntFieldUpdateOperationsInput | number | null
    submittedShares?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableEnumSubmissionRejectionReasonFieldUpdateOperationsInput | $Enums.SubmissionRejectionReason | null
    qualityRating?: NullableFloatFieldUpdateOperationsInput | number | null
    isEdited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlySnapshotUpdateWithoutUserInput = {
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlySnapshotUncheckedUpdateWithoutUserInput = {
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlySnapshotUncheckedUpdateManyWithoutUserInput = {
    month?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    reach?: IntFieldUpdateOperationsInput | number
    totalReach?: IntFieldUpdateOperationsInput | number
    engagementRate?: FloatFieldUpdateOperationsInput | number
    commitmentScore?: FloatFieldUpdateOperationsInput | number
    adminGradeScore?: FloatFieldUpdateOperationsInput | number
    approvedSubs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformLinkUpdateInput = {
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
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