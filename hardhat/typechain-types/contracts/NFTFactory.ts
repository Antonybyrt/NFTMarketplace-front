/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace NFTFactory {
  export type CollectionStruct = {
    collectionAddress: AddressLike;
    name: string;
    symbol: string;
    owner: AddressLike;
  };

  export type CollectionStructOutput = [
    collectionAddress: string,
    name: string,
    symbol: string,
    owner: string
  ] & {
    collectionAddress: string;
    name: string;
    symbol: string;
    owner: string;
  };
}

export interface NFTFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addNFTToCollection"
      | "buy"
      | "collections"
      | "createCollection"
      | "getAlreadyListed"
      | "getCollections"
      | "getNFTsInCollection"
      | "idMarket"
      | "market"
      | "sell"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "CollectionCreated" | "Debug"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addNFTToCollection",
    values: [AddressLike, string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "buy", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "collections",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAlreadyListed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollections",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNFTsInCollection",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "idMarket", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "market",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sell",
    values: [BigNumberish, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addNFTToCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAlreadyListed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNFTsInCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "idMarket", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "market", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
}

export namespace CollectionCreatedEvent {
  export type InputTuple = [
    collectionAddress: AddressLike,
    name: string,
    symbol: string
  ];
  export type OutputTuple = [
    collectionAddress: string,
    name: string,
    symbol: string
  ];
  export interface OutputObject {
    collectionAddress: string;
    name: string;
    symbol: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DebugEvent {
  export type InputTuple = [message: string];
  export type OutputTuple = [message: string];
  export interface OutputObject {
    message: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface NFTFactory extends BaseContract {
  connect(runner?: ContractRunner | null): NFTFactory;
  waitForDeployment(): Promise<this>;

  interface: NFTFactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addNFTToCollection: TypedContractMethod<
    [
      collectionAddress: AddressLike,
      name: string,
      symbol: string,
      tokenURI: string
    ],
    [void],
    "nonpayable"
  >;

  buy: TypedContractMethod<[marketId: BigNumberish], [void], "payable">;

  collections: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string] & {
        collectionAddress: string;
        name: string;
        symbol: string;
        owner: string;
      }
    ],
    "view"
  >;

  createCollection: TypedContractMethod<
    [name: string, symbol: string],
    [void],
    "nonpayable"
  >;

  getAlreadyListed: TypedContractMethod<
    [collection: AddressLike],
    [boolean],
    "view"
  >;

  getCollections: TypedContractMethod<
    [],
    [NFTFactory.CollectionStructOutput[]],
    "view"
  >;

  getNFTsInCollection: TypedContractMethod<
    [collectionAddress: AddressLike],
    [[string[], string[]] & { names: string[]; symbols: string[] }],
    "view"
  >;

  idMarket: TypedContractMethod<[], [bigint], "view">;

  market: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, bigint, boolean] & {
        price: bigint;
        seller: string;
        collection: string;
        timestamp: bigint;
        locked: boolean;
      }
    ],
    "view"
  >;

  sell: TypedContractMethod<
    [price: BigNumberish, collection: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addNFTToCollection"
  ): TypedContractMethod<
    [
      collectionAddress: AddressLike,
      name: string,
      symbol: string,
      tokenURI: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "buy"
  ): TypedContractMethod<[marketId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "collections"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string] & {
        collectionAddress: string;
        name: string;
        symbol: string;
        owner: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "createCollection"
  ): TypedContractMethod<[name: string, symbol: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getAlreadyListed"
  ): TypedContractMethod<[collection: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "getCollections"
  ): TypedContractMethod<[], [NFTFactory.CollectionStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getNFTsInCollection"
  ): TypedContractMethod<
    [collectionAddress: AddressLike],
    [[string[], string[]] & { names: string[]; symbols: string[] }],
    "view"
  >;
  getFunction(
    nameOrSignature: "idMarket"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "market"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, bigint, boolean] & {
        price: bigint;
        seller: string;
        collection: string;
        timestamp: bigint;
        locked: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "sell"
  ): TypedContractMethod<
    [price: BigNumberish, collection: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "CollectionCreated"
  ): TypedContractEvent<
    CollectionCreatedEvent.InputTuple,
    CollectionCreatedEvent.OutputTuple,
    CollectionCreatedEvent.OutputObject
  >;
  getEvent(
    key: "Debug"
  ): TypedContractEvent<
    DebugEvent.InputTuple,
    DebugEvent.OutputTuple,
    DebugEvent.OutputObject
  >;

  filters: {
    "CollectionCreated(address,string,string)": TypedContractEvent<
      CollectionCreatedEvent.InputTuple,
      CollectionCreatedEvent.OutputTuple,
      CollectionCreatedEvent.OutputObject
    >;
    CollectionCreated: TypedContractEvent<
      CollectionCreatedEvent.InputTuple,
      CollectionCreatedEvent.OutputTuple,
      CollectionCreatedEvent.OutputObject
    >;

    "Debug(string)": TypedContractEvent<
      DebugEvent.InputTuple,
      DebugEvent.OutputTuple,
      DebugEvent.OutputObject
    >;
    Debug: TypedContractEvent<
      DebugEvent.InputTuple,
      DebugEvent.OutputTuple,
      DebugEvent.OutputObject
    >;
  };
}
