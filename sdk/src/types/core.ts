import {
    SessionProps, 
    CommandProps,
    Path,
    EngineState,
    IClass,
    IBundle,
    Name,
    Id,
    ILogger,
    IFile,
    IDir,
    CommandType,
    SessionState,
    Target,
    Version,
    ProductState,
    IScript,
    CommandArg
} from '.'

export interface IEngine extends IClass  {
    readonly state: EngineState;
    readonly isStarted: boolean;
    readonly hasSession: boolean;
    readonly session?: ISession;

    changeState(state: EngineState): void;
    newSession(props?: SessionProps): Promise<void>;
    start(props?: SessionProps): Promise<ISession>;
    stop(): Promise<void>;
    exec(command?: ICommand, args?: CommandArg[]): Promise<any>;
}

export interface ISession extends IClass  {
    readonly props?: SessionProps;
    readonly logger: ILogger;
    readonly index: any;
    readonly state: SessionState;
    readonly isInitialized: boolean;
    readonly isReady: boolean;
    readonly product?: IProduct;
    
    initialize(command?: ICommand): Promise<void>;
    makeReady(): Promise<void>;
    destroy(): Promise<void>;
    changeState(state: SessionState): void;
    resolveProduct(): Promise<IProduct | undefined>;
    findBundle(id: Id, version?: Version): Promise<IBundle | undefined>;
    findStack(stackId: Id): Promise<IStack | undefined>;
}

export interface ICommand extends IClass  {
    readonly props: CommandProps;
    readonly session?: ISession;
    readonly requiresArgs: boolean;
    readonly requiresScript: boolean;
    readonly product?: IProduct;
    readonly target: Target;
    readonly type: CommandType;
    readonly id: Id;
    readonly script?: IScript;

    run(session: ISession, args?: CommandArg[]): Promise<any>;
    exec(session: ISession, args?: CommandArg[]): Promise<any>; 
}

export interface IProduct extends IClass  {
    readonly dir: IDir;
    readonly manifest: IFile;
    readonly session?: ISession;
    readonly exists: boolean;
    readonly context?: any;
    readonly stack?: IStack;
    readonly isLoaded: boolean;
    readonly isReady: boolean;
    readonly state: ProductState;

    create(): void;
    load(): Promise<IProduct>;
    saveContext(context: object): void;
    changeState(state: ProductState): void;
    loadFile (path: Path): void;
    saveData(data: any): void;
    findDirs(dirpath: Path): Path[]
}

export interface IStack extends IClass {
    readonly name: Name;
    readonly bundle: IBundle;
    readonly dir?: IDir;
    readonly exists: boolean;

    load(): Promise<IStack>;
    supportsTarget(target: Target): boolean;
    supportsTargetScript(target: Target, name: Name): boolean;    
    targetDir(target: Target): IDir | undefined;
    targetScriptDir(target: Target, name: Name): IDir | undefined;
    findTargetScript(target: Target, name: Name): Promise<IScript | undefined>;
}


