class HltbPlatform {
  static PC: any;
  getDescription(): string {
    throw new Error('Method not implemented');
  }
}

class Storefront {
  hltbStorefrontName?: string;
  constructor(hltbStorefrontName?: string) {
    this.hltbStorefrontName = hltbStorefrontName;
  }
}

class EditData {
  userId?: number;
  submissionId?: number;
  gameId?: number;
  title?: string;
  platform?: string;
  storefront?: string;
  lists?: {
    playing?: boolean;
    backlog?: boolean;
    completed?: boolean;
    custom?: boolean;
    replay?: boolean;
    retired?: boolean;
  };
  singlePlayer?: {
    compMain?: {
      time?: {
        hours?: number;
        minutes?: number;
        seconds?: number;
      };
    };
    compPlus?: {
      time?: {
        hours?: number;
        minutes?: number;
        seconds?: number;
      };
    };
    comp100?: {
      time?: {
        hours?: number;
        minutes?: number;
        seconds?: number;
      };
    };
  };
  general?: {
    completionDate?: {
      day?: string;
      month?: string;
      year?: string;
    };
    progress?: {
      hours?: number;
      minutes?: number;
      seconds?: number;
    };
  };
  constructor() { }
}

class HowLongToBeatClient {
  static getIsUserLoggedIn(): boolean {
    throw new Error("Method not implemented.");
  }
  static editIdExist(userGameId: any) {
    throw new Error("Method not implemented.");
  }
  static getEditData(name: any, submissionId: string): any {
    throw new Error("Method not implemented.");
  }
  static findIdExisting(arg0: any) {
    throw new Error("Method not implemented.");
  }
  static apiSubmitData(game: Game, editData: EditData): boolean | PromiseLike<boolean> {
    throw new Error("Method not implemented.");
  }
  getIsUserLoggedIn(): boolean {
    throw new Error('Method not implemented');
  }
  editIdExist(id: number): boolean {
    throw new Error('Method not implemented');
  }
  getEditData(gameName: string, submissionId: number): Promise<EditData> {
    throw new Error('Method not implemented');
  }
  findIdExisting(id: string): string {
    throw new Error('Method not implemented');
  }
  apiSubmitData(game: Game, editData: EditData): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

class Database {
  static get(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  static userHltbData: any;
  get(id: number): GameHowLongToBeat {
    throw new Error('Method not implemented');
  }
  userHltbData?: {
    userId?: number;
  };
  constructor() { }
}

class GameHowLongToBeat {
  id?: number;
  userId?: number;
  constructor(id?: number, userId?: number) {
    this.id = id;
    this.userId = userId;
  }
  getData(): HltbDataUser {
    throw new Error('Method not implemented');
  }
}

class HltbDataUser {
  id?: number;
  name?: string;
  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}

class AppPlugin {
  openSettingsView(): void {
    throw new Error('Method not implemented');
  }
  logError(ex: any, silent: boolean, fatal: boolean, pluginName: string): void {
    throw new Error('Method not implemented');
  }
}

class API {
  notifications?: {
    add(notification: NotificationMessage): void;
  };
  static Instance: any;
  constructor() { }
}

class NotificationMessage {
  id?: string;
  message?: string;
  type?: string;
  action?: () => void;
  constructor(id?: string, message?: string, type?: string, action?: () => void) {
    this.id = id;
    this.message = message;
    this.type = type;
    this.action = action;
  }
}

class ResourceProvider {
  static getString(arg0: string, name: string) {
    throw new Error("Method not implemented.");
  }
  getString(key: string, ...args: any[]): string {
    throw new Error('Method not implemented');
  }
}

class Logger {
  static warn(arg0: string) {
    throw new Error("Method not implemented.");
  }
  static info(arg0: string) {
    throw new Error("Method not implemented.");
  }
  warn(message: string): void {
    throw new Error('Method not implemented');
  }
  info(message: string): void {
    throw new Error('Method not implemented');
  }
}

class Common {
  static logError(ex: unknown, arg1: boolean, arg2: boolean, PluginName: any) {
    throw new Error("Method not implemented.");
  }
  logError(ex: any, silent: boolean, fatal: boolean, pluginName: string): void {
    throw new Error('Method not implemented');
  }
}