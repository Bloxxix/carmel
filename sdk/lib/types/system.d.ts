import { IClass, UTF8, Path, Name, CommandArg, Module, Version, Id } from '.';
import { Target, ArtifactsKind } from './base';
export interface IData extends IClass {
    readonly raw: UTF8;
    readonly isJson: boolean;
    json(): any;
    update(data: UTF8 | object): void;
    append(data: UTF8 | object): void;
}
export interface IFile extends IClass {
    readonly path?: Path;
    readonly data: IData;
    readonly exists: boolean;
    load(): void;
    save(): void;
    update(data: UTF8 | object): void;
}
export interface IDir extends IClass {
    readonly path?: Path;
    readonly exists: boolean;
    readonly dirs: Path[];
    dir(dirpath: Path): IDir | undefined;
    file(filepath: Path): IFile | undefined;
}
export interface IScript extends IClass {
    readonly name: Name;
    readonly target: Target;
    readonly dir?: IDir;
    readonly exists: boolean;
    readonly module?: Module;
    load(): Promise<IScript | undefined>;
    exec(args?: CommandArg[]): Promise<any>;
}
export interface ILogger extends IClass {
    readonly props: any;
}
export interface IBundle extends IClass {
    readonly dir: IDir;
    readonly id: Id;
    readonly version: Version;
    readonly exists: boolean;
    load(): Promise<IBundle>;
    loadArtifact(name: Name, kind: ArtifactsKind): Promise<any>;
}
