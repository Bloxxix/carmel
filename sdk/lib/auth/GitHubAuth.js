"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubAuth = void 0;
var passport_github2_1 = require("passport-github2");
var passport_1 = __importDefault(require("passport"));
var __1 = require("..");
/**
 *
 */
var GitHubAuth = /** @class */ (function () {
    /**
     *
     * @param authenticator
     */
    function GitHubAuth(authenticator) {
        this._authenticator = authenticator;
    }
    Object.defineProperty(GitHubAuth.prototype, "authenticator", {
        /**
         *
         */
        get: function () {
            return this._authenticator;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param clientID
     * @param clientSecret
     */
    GitHubAuth.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                passport_1.default.serializeUser(function (user, done) {
                    done(null, user);
                });
                passport_1.default.deserializeUser(function (user, done) {
                    done(null, user);
                });
                passport_1.default.use(new passport_github2_1.Strategy({
                    clientID: GitHubAuth.APP_CLIENT_ID,
                    clientSecret: GitHubAuth.APP_CLIENT_SECRET,
                    callbackURL: this.authenticator.endpoint("auth/github/callback"),
                }, function (accessToken, refreshToken, profile, done) {
                    process.nextTick(function () {
                        done(null, __assign(__assign({}, profile._json), { tokens: [
                                {
                                    type: __1.AccessTokenType.GITHUB,
                                    value: accessToken,
                                },
                            ] }));
                    });
                }));
                this.authenticator.app.get('/auth/github', passport_1.default.authenticate('github', {
                    scope: ['user:email'],
                }));
                this.authenticator.app.get('/auth/github/callback', passport_1.default.authenticate('github', {
                    failureRedirect: '/login',
                }), function (req, res) {
                    res.redirect('/');
                });
                return [2 /*return*/];
            });
        });
    };
    /** */
    GitHubAuth.APP_CLIENT_ID = '638343cb36c073a0a29f';
    /** */
    GitHubAuth.APP_CLIENT_SECRET = '7008e0bf5922f1b2cea61e2d62e4b6057288b367';
    return GitHubAuth;
}());
exports.GitHubAuth = GitHubAuth;
//# sourceMappingURL=GitHubAuth.js.map