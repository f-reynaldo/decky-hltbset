async function setCurrentPlayTime(game: Game, elapsedSeconds: number = 0, noPlaying: boolean = false, isCompleted: boolean = false, isMain: boolean = false, isMainSide: boolean = false, is100: boolean = false): Promise<boolean> {
  try {
    if (HowLongToBeatClient.getIsUserLoggedIn()) {
      const gameHowLongToBeat = Database.get(game.id);
      if (gameHowLongToBeat) {
        const time = new TimeSpan(elapsedSeconds);
        let platformName = HltbPlatform.PC.getDescription();
        let storefrontName = '';

        // Search platform
        const platform = game.platforms?.[0];
        if (!platform) {
          Logger.warn(`Cannot submit data for a game without platform (${game.name})`);
          API.Instance.notifications.add(new NotificationMessage(
            `${PluginName}-NoPlatform-Error-${new Guid()}`,
            `${PluginName}\n${ResourceProvider.getString('LOCHowLongToBeatErrorNoPlatform', game.name)}`,
            NotificationType.Error,
            () => Plugin.openSettingsView()
          ));
          return false;
        }

        const match = PluginSettings.settings.platforms.find(p => p.platform === platform)?.hltbPlatform;
        if (match) {
          platformName = match.getDescription();
        } else {
          Logger.warn(`No platform find for ${game.name} - Default "PC" used`);
          API.Instance.notifications.add(new NotificationMessage(
            `${PluginName}-NoPlatformDefined-Error-${new Guid()}`,
            `${PluginName}\n${ResourceProvider.getString('LOCHowLongToBeatErrorNoPlatformDefaultUsed', platform.name, game.name)}`,
            NotificationType.Error,
            () => Plugin.openSettingsView()
          ));
        }

        // Search storefront
        const storefront = PluginSettings.settings.storefrontElements.find(x => x.sourceId === game.sourceId);
        if (storefront) {
          storefrontName = storefront.hltbStorefrontName;
        } else {
          Logger.warn(`No storefront find for ${game.name}`);
        }

        // Get current data from HowLongToBeat
        const hltbDataUser = gameHowLongToBeat.getData();
        const hltbData = getUserHltbDataCurrent(hltbDataUser.id, gameHowLongToBeat.userGameId);
        const editData = new EditData();
        let submissionId = '0';

        if (hltbData && HowLongToBeatClient.editIdExist(hltbData.userGameId)) {
          submissionId = hltbData.userGameId;
          editData = await HowLongToBeatClient.getEditData(gameHowLongToBeat.name, submissionId);
        } else {
          // Find existing in website
          if (hltbDataUser) {
            const tmpEditId = HowLongToBeatClient.findIdExisting(hltbDataUser.id.toString());
            if (tmpEditId) {
              submissionId = tmpEditId;
              editData = await HowLongToBeatClient.getEditData(gameHowLongToBeat.name, submissionId);
            } else {
              Logger.info(`No existing data in website find for ${game.name}`);
            }
          }
        }

        if (!editData) {
          Logger.warn(`No editData for ${game.name}`);
          return false;
        }

        // Data
        editData.userId = Database.userHltbData.userId;
        editData.submissionId = parseInt(submissionId);
        editData.gameId = hltbDataUser.id;
        editData.title = hltbDataUser.name;
        editData.platform = platformName;
        editData.storefront = editData.storefront || storefrontName;

        if (!noPlaying) {
          editData.lists.playing = true;
        } else if (!editData.lists.backlog && !editData.lists.completed && !editData.lists.custom && !editData.lists.playing && !editData.lists.replay && !editData.lists.retired) {
          editData.lists.playing = true;
        }

        if (isCompleted) {
          editData.lists.completed = true;

          if (isMain) {
            editData.singlePlayer.compMain.time.hours = time.hours + (24 * time.days);
            editData.singlePlayer.compMain.time.minutes = time.minutes;
            editData.singlePlayer.compMain.time.seconds = time.seconds;

            editData.general.completionDate.day = game.lastActivity.getDate().toString();
            editData.general.completionDate.month = game.lastActivity.getMonth().toString();
            editData.general.completionDate.year = game.lastActivity.getFullYear().toString();
          }

          if (isMainSide) {
            editData.singlePlayer.compPlus.time.hours = time.hours + (24 * time.days);
            editData.singlePlayer.compPlus.time.minutes = time.minutes;
            editData.singlePlayer.compPlus.time.seconds = time.seconds;

            if (!editData.general.completionDate.day || editData.general.completionDate.day === '00') {
              editData.general.completionDate.day = game.lastActivity.getDate().toString();
              editData.general.completionDate.month = game.lastActivity.getMonth().toString();
              editData.general.completionDate.year = game.lastActivity.getFullYear().toString();
            }
          }

          if (is100) {
            editData.singlePlayer.comp100.time.hours = time.hours + (24 * time.days);
            editData.singlePlayer.comp100.time.minutes = time.minutes;
            editData.singlePlayer.comp100.time.seconds = time.seconds;

            if (!editData.general.completionDate.day || editData.general.completionDate.day === '00') {
              editData.general.completionDate.day = game.lastActivity.getDate().toString();
              editData.general.completionDate.month = game.lastActivity.getMonth().toString();
              editData.general.completionDate.year = game.lastActivity.getFullYear().toString();
            }
          }
        }

        editData.general.progress.hours = time.hours + (24 * time.days);
        editData.general.progress.minutes = time.minutes;
        editData.general.progress.seconds = time.seconds;

        return await HowLongToBeatClient.apiSubmitData(game, editData);
      }
    } else {
      API.Instance.notifications.add(new NotificationMessage(
        `${PluginName}-NotLoggedIn-Error`,
        `${PluginName}\n${ResourceProvider.getString('LOCCommonNotLoggedIn')}`,
        NotificationType.Error,
        () => Plugin.openSettingsView()
      ));
      return false;
    }
  } catch (ex) {
    Common.logError(ex, false, true, PluginName);
  }

  return false;
}