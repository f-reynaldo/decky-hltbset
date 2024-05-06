interface Game {
  id: number;
  name: string;
  platforms: Platform[];
  sourceId: number;
  lastActivity: Date;
}

interface Platform {
  name: string;
}

interface HltbPlatform {
  getDescription(): string;
}

interface Storefront {
  hltbStorefrontName?: string;
}

interface EditData {
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
}

interface HowLongToBeatClient {
  getIsUserLoggedIn(): boolean;
  editIdExist(id: number): boolean;
  getEditData(gameName: string, submissionId: number): Promise<EditData>;
  findIdExisting(id: string): string;
  apiSubmitData(game: Game, editData: EditData): Promise<boolean>;
}

interface Database {
  get(id: number): GameHowLongToBeat;
  userHltbData?: {
    userId?: number;
  };
}

interface GameHowLongToBeat {
  id?: number;
  userId?: number;
  getData(): HltbDataUser;
}

interface HltbDataUser {
  id?: number;
  name?: string;
}

interface Plugin {
  openSettingsView(): void;
  logError(ex: any, silent: boolean, fatal: boolean, pluginName: string): void;
}

interface API {
  notifications?: {
    add(notification: NotificationMessage): void;
  };
}

interface NotificationMessage {
  id?: string;
  message?: string;
  type?: string;
  action?: () => void;
}

interface ResourceProvider {
  getString(key: string, ...args: any[]): string;
}

interface Logger {
  warn(message: string): void;
  info(message: string): void;
}

interface Common {
  logError(ex: any, silent: boolean, fatal: boolean, pluginName: string): void;
}