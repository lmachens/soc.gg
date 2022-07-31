export const AI_MODES: {
  [mode: number]: string;
} = {
  0: "Player", // Is "Off" in game-files,
  5: "Easy",
  20: "Medium",
  30: "AutoBattle",
};

export const FACTIONS: {
  [mode: number]: string;
} = {
  0: "Neutral", // Is "Off" in game-files,
  1: "Arleon",
  2: "Barony of Loth",
  3: "Barya",
  4: "Rana",
};

export const serializeSavegame = (
  savegame: SavegameDeserialized
): SavegameSerialized => {
  const gameConfig = JSON.stringify(savegame.File._gameConfig);
  const file = {
    ...savegame.File,
    _gameConfig: gameConfig,
  };
  const fileData = {
    File: JSON.stringify(file),
    Metadata: JSON.stringify(savegame.Metadata),
  };
  return fileData;
};

export const deserializeSavegame = (text: string) => {
  const fileData = JSON.parse(text) as SavegameSerialized;
  const file = JSON.parse(fileData.File);
  const gameConfig = JSON.parse(file._gameConfig);
  const savegame = {
    File: {
      ...file,
      _gameConfig: gameConfig,
    },
    Metadata: JSON.parse(fileData.Metadata),
  };
  return savegame;
};

export type SavegameSerialized = {
  File: string;
  Metadata: string;
};

export type SavegameDeserialized = {
  File: {
    _aiState: {
      _triggerIdentifiers: {
        TriggerId: string;
        InteractorId: 613;
      }[];
    };
    _artifactsSerializable: {
      _bacterias: {
        BacteriaType: number;
        Duration: {
          Type: number;
          Duration: number;
        };
        TargetType: number;
        _casterInformation: {
          ScalingLevel: number;
          SpellDamagePowerPercent: number;
        };
        _id: number;
        _parentId: number;
      }[];
      _equippedInSlot: number;
      _id: number;
      _owner: number;
      _positionIndex: number;
      _statuses: [];
      _type: number;
    }[];
    _bacterias: [];
    _battlesSerializable: {
      _attackerPostBattleActions: [];
      _attackingTeamId: number;
      _bacterias: [];
      _battleArtifactsSerializable: [];
      _battleCommandersSerializable: [];
      _battleTroopsSerializable: [];
      _currentTroopId: number;
      _currentTurn: number;
      _defendingTeamId: number;
      _gameMode: number;
      _highestChildId: number;
      _id: number;
      _instanceRandomSeed: number;
      _isActive: boolean;
      _isBattleFinalized: boolean;
      _isQuickBattle: boolean;
      _location: { x: number; y: number };
      _mapEntitiesSerializable: [];
      _mapFormat: {
        Metadata: {
          AtmosphereCondition: {
            time: number;
            wind: number;
            rain: number;
            thunder: number;
          };
          BannedBuildings: [];
          BannedCommanders: [];
          BannedResearch: [];
          CommanderCountLimits: [];
          CommanderLevelLimits: [];
          CustomLoseText: string;
          CustomRandomEvents: [];
          CustomWinText: string;
          DefaultAtmosphereCondition: {
            time: number;
            wind: number;
            rain: number;
            thunder: number;
          };
          Description: string;
          FightOrFlightFleeingEnabled: boolean;
          FightOrFlightJoiningEnabled: boolean;
          ForcedAis: [];
          ForcedFactions: [];
          ForcedNames: [];
          ForcedTeamColors: [];
          HostileGrowthPercentage: number;
          Image: { _bytes: number[] };
          LoseConditionDefinitions: {
            Type: number;
            Commander: {
              name: string;
            };
            Round: number;
            Team: number;
          }[];
          Name: string;
          PathName: string;
          Players: number;
          RandomEventsEnabled: boolean;
          ShowFullTroopRosterInTowns: boolean;
          Size: { x: number; y: number };
          TeamStartingWielders: [];
          Type: number;
          TypeOfMusic: number;
          WinConditions: number[];
        };
        Contents: {
          Decorations: number[];
          Effects: number[];
          Elevations: number[];
          MapEntities: {
            Components: [];
            Id: number;
            Name: string;
            X: number;
            Y: number;
          }[];
          Roads: number[];
          StandaloneDecorations: number[];
          StartingResources: {
            _resources: {
              Type: number;
              _allTimeAmount: number;
              _amount: number;
            }[];
          };
          Themes: number[];
          Types: number[];
          Variations: number[];
          Water: number[];
        };
      };
      _queue: [];
      _researchSerializable: [];
      _startedClients: number;
      _surroundings: {
        position: {
          x: number;
          y: number;
        };
        attackingFactionIndex: number;
        defendingFactionIndex: number;
        west: {
          decoration: number;
          effects: number;
          elevation: number;
          mapEntity: {
            blueprintId: number;
            team: number;
            overrideVariation: boolean;
            variation: number;
          };
          standaloneDecoration: number;
          theme: number;
          water: number;
          _type: number;
        };
        north: {
          decoration: number;
          effects: number;
          elevation: number;
          mapEntity: {
            blueprintId: number;
            team: number;
            overrideVariation: boolean;
            variation: number;
          };
          standaloneDecoration: number;
          theme: number;
          water: number;
          _type: number;
        };
        east: {
          decoration: number;
          effects: number;
          elevation: number;
          mapEntity: {
            blueprintId: number;
            team: number;
            overrideVariation: boolean;
            variation: number;
          };
          standaloneDecoration: number;
          theme: number;
          water: number;
          _type: number;
        };
        center: {
          decoration: number;
          effects: number;
          elevation: number;
          mapEntity: {
            blueprintId: number;
            team: number;
            overrideVariation: boolean;
            variation: number;
          };
          standaloneDecoration: number;
          theme: number;
          water: number;
          _type: number;
        };
      };
      _syncedClients: [];
      _teamsSerializable: [];
    }[];
    _chatContainers: {
      _hasUnreadMessages: boolean;
      _listOfMessages: [];
      _teamId: number;
    }[];
    _commandersSerializable: {
      wielderVaultSettings: {
        load: boolean;
        loadAs: string;
        save: boolean;
        saveArtifacts: boolean;
        saveAs: string;
        saveTroops: boolean;
      };

      _aiState: {
        _currentMood: {
          _values: number[];
        };
        _recruitmentTownId: number;
        _roundWhichCommanderWasBorn: number;
        _targetMood: {
          _values: number[];
        };
      };
      _alwaysFightTeams: [];
      _alwaysJoinTeams: [];
      _artworkDirection: number;
      _bacteriaInformationCollector: {
        GenericMapping: {
          FilterEvaluation: number;
          Filters: [];
          _maxTroopSize: number;
        };
        SpecificMappings: [];
      };
      _bacterias: {
        BacteriaType: number;
        Duration: {
          Type: number;
          Duration: number;
        };
        TargetType: number;
        _casterInformation: {
          ScalingLevel: number;
          SpellDamagePowerPercent: number;
        };
        _id: number;
        _parentId: number;
      }[];
      _battleSurrounding: { identifier: string };
      _birthNumber: number;
      _commanderTriggers: [];
      _destination: {};
      _disablesWithdraw: boolean;
      _encounterName: string;
      _essenceWallet: {
        _order: number;
        _creation: number;
        _chaos: number;
        _arcana: number;
        _destruction: number;
        _alwaysEmpty: number;
      };
      _faction: number;
      _hostileJoiningTeam: number;
      _id: number;
      _internalState: number;
      _movesTaken: number;
      _position: { x: number; y: number };
      _reference: { Name: string };
      _skills: { Skill: number; Level: number }[];
      _spellbookQuickbar: [];
      _spellsCastDuringCurrentBattleRound: 0;
      _spellsCastDuringCurrentTroop: 0;
      _stats: {
        _command: number;
        _customValues: [];
        _defense: number;
        _diplomacyBonus: number;
        _essenceLeech: number;
        _essenceStats: {
          _order: number;
          _creation: number;
          _chaos: number;
          _arcana: number;
          _destruction: number;
        };
        _experience: number;
        _movement: number;
        _offense: number;
        _pillageBonusPercent: number;
        _spellDamagePowerPercent: number;
        _spellsPerRound: number;
        _statuses: number[];
        _townPortalLevel: number;
        _tutorPercent: number;
        _viewRadius: number;
        _woodcutterRadius: number;
        _xpMultiplier: number;
      };
      _storedBuildingId: number;
      _teamId: number;
      _turnsEndedAsDead: number;
      _unspentSkillPoints: number;
      _wantedBattleMap: string;
    }[];
    _currentTeamId: number;
    _currentTurn: number;
    _gameConfig: {
      dwellings: {
        costMultiplier: number;
        multipliersForNeutralDwellings: {
          default: number;
          high: number;
          low: number;
          veryHigh: number;
        };
        sizeIncreaseMultiplier: number;
        sizeMaxMultiplier: number;
        sizeStartingMultiplier: number;
      };
      general: {
        disableFog: boolean;
        roundsUntilDeathWithoutTown: number;
      };
      resources: {
        startingResourceMultipliers: {
          default: number;
          high: number;
          low: number;
          veryHigh: number;
        };
        startingResources: {
          ancientAmber: number;
          celestialOre: number;
          glimmerWeave: number;
          gold: number;
          stone: number;
          wood: number;
        };
      };
      towns: {
        buildingsRazedPerTurn: number;
        constructionRoundsForLargeBuildings: number;
        constructionRoundsForMediumBuildings: number;
        constructionRoundsForSmallBuildings: number;
      };
      wielders: {
        experienceFromKillingWielders: number;
        experienceMultiplierFromKillingTroops: number;
        maxNumberOfPowers: number;
        maxNumberOfSkills: number;
        revivalCosts: {
          "1to4": { gold: number };
          "5to7": { gold: number };
          "8to12": {
            gold: number;
            glimmerWeave: number;
            ancientAmber: number;
            celestialOre: number;
          };
          "13to17": {
            gold: number;
            glimmerWeave: number;
            ancientAmber: number;
            celestialOre: number;
          };
          "18to25": {
            gold: number;
            glimmerWeave: number;
            ancientAmber: number;
            celestialOre: number;
          };
          over25: {
            gold: number;
            glimmerWeave: number;
            ancientAmber: number;
            celestialOre: number;
          };
          revivalRoundsFinished: { gold: number };
        };
        roundsUntilRevival: number;
        zombieModifier: number;
      };
    };
    _gameMode: number;
    _highestID: number;
    _incomeRegistry: {
      _teamEntries: {
        _entries: {
          Income: {
            _resources: {
              Type: number;
              _amount: number;
              _allTimeAmount: number;
            }[];
            _troopIncomes: [];
          };
          IncomeSourceType: number;
          UniqueId: number;
        };
        _teamId: number;
      }[];
      _instanceRandomSeed: number;
      _isStarted: boolean;
    };
    _instanceRandomSeed: number;
    _isStarted: boolean;
    _level: {
      _exploration: {
        _teamId: 0;
        _exploredTiles: number[];
        _mapSize: {
          x: number;
          y: number;
        };
      }[];
      _map: {
        Metadata: {
          AtmosphereCondition: {
            time: number;
            wind: number;
            rain: number;
            thunder: number;
          };
          BannedBuildings: [];
          BannedCommanders: [];
          BannedResearch: [];
          CommanderCountLimits: [];
          CommanderLevelLimits: [];
          CustomLoseText: string;
          CustomRandomEvents: [];
          CustomWinText: string;
          DefaultAtmosphereCondition: {
            time: number;
            wind: number;
            rain: number;
            thunder: number;
          };
          Description: string;
          FightOrFlightFleeingEnabled: boolean;
          FightOrFlightJoiningEnabled: boolean;
          ForcedAis: [];
          ForcedFactions: [];
          ForcedNames: [];
          ForcedTeamColors: [];
          HostileGrowthPercentage: number;
          Image: { _bytes: number[] };
          LoseConditionDefinitions: {
            Type: number;
            Commander: {
              name: string;
            };
            Round: number;
            Team: number;
          }[];
          Name: string;
          PathName: string;
          Players: number;
          RandomEventsEnabled: boolean;
          ShowFullTroopRosterInTowns: boolean;
          Size: { x: number; y: number };
          TeamStartingWielders: [];
          Type: number;
          TypeOfMusic: number;
          WinConditions: number[];
        };
        Contents: {
          Decorations: number[];
          Effects: number[];
          Elevations: number[];
          MapEntities: {
            Components: [];
            Id: number;
            Name: string;
            X: number;
            Y: number;
          }[];
          Roads: number[];
          StandaloneDecorations: number[];
          StartingResources: {
            _resources: {
              Type: number;
              _allTimeAmount: number;
              _amount: number;
            }[];
          };
          Themes: number[];
          Types: number[];
          Variations: number[];
          Water: number[];
        };
      };
      _mapEntitiesSerializable: {
        _bacterias: [];
        _blueprintId: number;
        _category: number;
        _id: number;
        _interactionStats: [];
        _isEnabled: boolean;
        _isVisibleInGame: boolean;
        _position: { x: number; y: number };
        _serializableComponentData: string[];
        _statuses: [];
        _triggerStats: [];
      }[];
      _startInfo: {
        AppVersion: string;
        Campaign: {
          CampaignIdentifier: string;
          CampaignLevelIdentifier: string;
          TransferredCommanders: {
            Artifacts: {
              _bacterias: {
                BacteriaType: number;
                Duration: {
                  Type: number;
                  Duration: number;
                };
                TargetType: number;
                _casterInformation: {
                  ScalingLevel: number;
                  SpellDamagePowerPercent: number;
                };
                _id: number;
                _parentId: number;
              }[];
              _equippedInSlot: number;
              _id: number;
              _owner: number;
              _positionIndex: number;
              _statuses: [];
              _type: number;
            }[];
            Experience: number;
            Name: string;
            Skills: {
              Level: number;
              Skill: number;
            }[];
            Troops: [];
          }[];
        };
        Mode: number;
      };
    };
    _mapSettings: {
      DwellingMultiplier: number;
      HostileGrowthRate: number;
      ResourcesMultiplier: number;
      WielderCap: number;
    };
    _partnershipsSerializable: {
      _id: number;
      _teamsInPartnership: number[];
    }[];
    _researchSerializable: {
      ownerId: number;
      _bacterias: {
        BacteriaType: number;
        Duration: {
          Type: number;
          Duration: number;
        };
        TargetType: number;
        _casterInformation: {
          ScalingLevel: number;
          SpellDamagePowerPercent: number;
        };
        _id: number;
        _parentId: number;
      }[];
      _id: number;
      _isEnabled: boolean;
      _requiredMapEntity: number;
      _requiredMapEntityId: number;
      _scope: number;
      _statuses: [];
      _type: number;
    }[];
    _roundData: {
      CurrentTurnIndex: number;
      RoundNumber: number;
      TurnQueue: {
        Teams: {
          IsAlive: boolean;
          IsCurrentlyInBattle: boolean;
          IsReadyToEndTurn: boolean;
          TeamId: number;
        }[];
      }[];
      TurnStyle: number;
    };
    _storyObjectives: {
      _objective: {
        canBeCompleted: boolean;
        currentValue: number;
        hasLocation: boolean;
        identifier: string;
        location: { x: number; y: number };
        maxValue: number;
        name: string;
        optional: boolean;
        progressText: string;
        progressType: number;
      };
      _teamId: number;
    }[];
    _teamQueueSerializable: {
      Round: number;
      TeamId: number;
    }[];
    _teamsSerializable: {
      _aiMode: number;
      _aiState: {
        _buildPlans: { _mapEntityIds: []; _buildPlans: [] };
        _grudge: { grudges: [] };
        _selectorState: {
          _preferences: {
            Behaviors: [];
            BuildPlans: {
              _applicableFor: number;
              _entries: {
                type: number;
                buildingType: number;
                research: number;
                important: boolean;
              }[];
              _name: string;
            }[];
            Buildings: [];
            Type: number;
          }[];
          _phase: number;
        };
        _wantedArmyValue: number;
      };
      _bacteriaInformationCollector: {
        GenericMapping: {
          FilterEvaluation: number;
          Filters: [];
          _maxTroopSize: number;
        };
        SpecificMappings: [];
      };
      _bacterias: [];
      _factionIndex: number;
      _isAlive: boolean;
      _name: string;
      _resources: {
        _resources: { Type: number; _amount: number; _allTimeAmount: number }[];
      };
      _roundWhenLostAbilityToPurchaseCommander: number;
      _statistics: {
        _roundStatistics: {
          ArmyValue: number;
          Income: { Type: number; _amount: number; _allTimeAmount: number }[];
          LostBattles: number;
          RandomEvents: [];
          Round: number;
          UnspentResources: {
            Type: number;
            _amount: number;
            _allTimeAmount: number;
          }[];
          WonBattles: number;
        }[];
      };
      _stats: {
        _allDwellingIncrease: number;
        _buildingConstructionsPerBase: number;
        _commanderPopulationCap: number;
        _commanderPopulationCapMax: number;
        _largeDwellingIncrease: number;
        _mediumDwellingIncrease: number;
        _smallDwellingIncrease: number;
      };
      _statuses: [];
      _teamColorCollection: {
        Complementary: { r: number; g: number; b: number; a: number };
        Dark: { r: number; g: number; b: number; a: number };
        Primary: { r: number; g: number; b: number; a: number };
      };
      _teamColorIndex: 0;
      _teamID: 0;
    }[];
    _triggerContainers: [];
    _troopsSerializable: {
      _bacterias: [];
      _formationIndex: number;
      _id: number;
      _parentId: number;
      _parentType: number;
      _reference: {
        FactionIndex: number;
        UnitIndex: number;
        Size: number;
        UpgradeType: number;
      };
      _stats: {
        _attacks: number;
        _canPerformAttacksOfOpportunity: true;
        _damage: { min: number; max: number };
        _damageMultiplier: number;
        _defense: number;
        _essenceStats: {
          _order: number;
          _creation: number;
          _chaos: number;
          _arcana: number;
          _destruction: number;
        };
        _health: number;
        _ignoresZoneOfControlCounter: number;
        _initiative: number;
        _maxTroopSize: number;
        _meleeAttack: {
          _deadlyRange: number;
          _offense: number;
          _range: { min: number; max: number };
          _resistancePercent: number;
        };
        _movement: number;
        _rangedAttack: {
          _deadlyRange: number;
          _offense: number;
          _range: { min: number; max: number };
          _resistancePercent: number;
        };
        _restrictions: [];
        _retaliations: number;
        _size: number;
        _spellDamageResistance: number;
        _statuses: number[];
        _tier: number;
      };
      _teamId: number;
    }[];
  };

  Metadata: {
    CampaignIdentifier: string;
    GameMode: number;
    MapName: string;
    Players: number;
    Round: number;
    SaveVersion: number;
  };
};
