const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, ModuleConcatenationPlugin } = require('webpack').optimize;
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');

const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = true;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
            customProperties({ preserve: true })
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": {
      "rxjs/AsyncSubject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/AsyncSubject.js",
      "rxjs/BehaviorSubject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/BehaviorSubject.js",
      "rxjs/InnerSubscriber": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/InnerSubscriber.js",
      "rxjs/Notification": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Notification.js",
      "rxjs/Observable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Observable.js",
      "rxjs/Observer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Observer.js",
      "rxjs/Operator": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Operator.js",
      "rxjs/OuterSubscriber": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/OuterSubscriber.js",
      "rxjs/ReplaySubject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/ReplaySubject.js",
      "rxjs/Rx": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Rx.js",
      "rxjs/Scheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Scheduler.js",
      "rxjs/Subject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Subject.js",
      "rxjs/SubjectSubscription": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/SubjectSubscription.js",
      "rxjs/Subscriber": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Subscriber.js",
      "rxjs/Subscription": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/Subscription.js",
      "rxjs/add/observable/bindCallback": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/bindCallback.js",
      "rxjs/add/observable/bindNodeCallback": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/bindNodeCallback.js",
      "rxjs/add/observable/combineLatest": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/combineLatest.js",
      "rxjs/add/observable/concat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/concat.js",
      "rxjs/add/observable/defer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/defer.js",
      "rxjs/add/observable/dom/ajax": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/dom/ajax.js",
      "rxjs/add/observable/dom/webSocket": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/dom/webSocket.js",
      "rxjs/add/observable/empty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/empty.js",
      "rxjs/add/observable/forkJoin": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/forkJoin.js",
      "rxjs/add/observable/from": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/from.js",
      "rxjs/add/observable/fromEvent": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/fromEvent.js",
      "rxjs/add/observable/fromEventPattern": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/fromEventPattern.js",
      "rxjs/add/observable/fromPromise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/fromPromise.js",
      "rxjs/add/observable/generate": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/generate.js",
      "rxjs/add/observable/if": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/if.js",
      "rxjs/add/observable/interval": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/interval.js",
      "rxjs/add/observable/merge": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/merge.js",
      "rxjs/add/observable/never": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/never.js",
      "rxjs/add/observable/of": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/of.js",
      "rxjs/add/observable/onErrorResumeNext": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/onErrorResumeNext.js",
      "rxjs/add/observable/pairs": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/pairs.js",
      "rxjs/add/observable/race": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/race.js",
      "rxjs/add/observable/range": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/range.js",
      "rxjs/add/observable/throw": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/throw.js",
      "rxjs/add/observable/timer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/timer.js",
      "rxjs/add/observable/using": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/using.js",
      "rxjs/add/observable/zip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/observable/zip.js",
      "rxjs/add/operator/audit": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/audit.js",
      "rxjs/add/operator/auditTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/auditTime.js",
      "rxjs/add/operator/buffer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/buffer.js",
      "rxjs/add/operator/bufferCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/bufferCount.js",
      "rxjs/add/operator/bufferTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/bufferTime.js",
      "rxjs/add/operator/bufferToggle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/bufferToggle.js",
      "rxjs/add/operator/bufferWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/bufferWhen.js",
      "rxjs/add/operator/catch": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/catch.js",
      "rxjs/add/operator/combineAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/combineAll.js",
      "rxjs/add/operator/combineLatest": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/combineLatest.js",
      "rxjs/add/operator/concat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/concat.js",
      "rxjs/add/operator/concatAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/concatAll.js",
      "rxjs/add/operator/concatMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/concatMap.js",
      "rxjs/add/operator/concatMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/concatMapTo.js",
      "rxjs/add/operator/count": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/count.js",
      "rxjs/add/operator/debounce": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/debounce.js",
      "rxjs/add/operator/debounceTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/debounceTime.js",
      "rxjs/add/operator/defaultIfEmpty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/defaultIfEmpty.js",
      "rxjs/add/operator/delay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/delay.js",
      "rxjs/add/operator/delayWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/delayWhen.js",
      "rxjs/add/operator/dematerialize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/dematerialize.js",
      "rxjs/add/operator/distinct": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/distinct.js",
      "rxjs/add/operator/distinctUntilChanged": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js",
      "rxjs/add/operator/distinctUntilKeyChanged": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/distinctUntilKeyChanged.js",
      "rxjs/add/operator/do": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/do.js",
      "rxjs/add/operator/elementAt": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/elementAt.js",
      "rxjs/add/operator/every": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/every.js",
      "rxjs/add/operator/exhaust": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/exhaust.js",
      "rxjs/add/operator/exhaustMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/exhaustMap.js",
      "rxjs/add/operator/expand": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/expand.js",
      "rxjs/add/operator/filter": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/filter.js",
      "rxjs/add/operator/finally": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/finally.js",
      "rxjs/add/operator/find": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/find.js",
      "rxjs/add/operator/findIndex": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/findIndex.js",
      "rxjs/add/operator/first": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/first.js",
      "rxjs/add/operator/groupBy": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/groupBy.js",
      "rxjs/add/operator/ignoreElements": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/ignoreElements.js",
      "rxjs/add/operator/isEmpty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/isEmpty.js",
      "rxjs/add/operator/last": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/last.js",
      "rxjs/add/operator/let": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/let.js",
      "rxjs/add/operator/map": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/map.js",
      "rxjs/add/operator/mapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/mapTo.js",
      "rxjs/add/operator/materialize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/materialize.js",
      "rxjs/add/operator/max": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/max.js",
      "rxjs/add/operator/merge": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/merge.js",
      "rxjs/add/operator/mergeAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/mergeAll.js",
      "rxjs/add/operator/mergeMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/mergeMap.js",
      "rxjs/add/operator/mergeMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/mergeMapTo.js",
      "rxjs/add/operator/mergeScan": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/mergeScan.js",
      "rxjs/add/operator/min": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/min.js",
      "rxjs/add/operator/multicast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/multicast.js",
      "rxjs/add/operator/observeOn": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/observeOn.js",
      "rxjs/add/operator/onErrorResumeNext": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/onErrorResumeNext.js",
      "rxjs/add/operator/pairwise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/pairwise.js",
      "rxjs/add/operator/partition": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/partition.js",
      "rxjs/add/operator/pluck": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/pluck.js",
      "rxjs/add/operator/publish": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/publish.js",
      "rxjs/add/operator/publishBehavior": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/publishBehavior.js",
      "rxjs/add/operator/publishLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/publishLast.js",
      "rxjs/add/operator/publishReplay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/publishReplay.js",
      "rxjs/add/operator/race": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/race.js",
      "rxjs/add/operator/reduce": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/reduce.js",
      "rxjs/add/operator/repeat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/repeat.js",
      "rxjs/add/operator/repeatWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/repeatWhen.js",
      "rxjs/add/operator/retry": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/retry.js",
      "rxjs/add/operator/retryWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/retryWhen.js",
      "rxjs/add/operator/sample": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/sample.js",
      "rxjs/add/operator/sampleTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/sampleTime.js",
      "rxjs/add/operator/scan": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/scan.js",
      "rxjs/add/operator/sequenceEqual": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/sequenceEqual.js",
      "rxjs/add/operator/share": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/share.js",
      "rxjs/add/operator/shareReplay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/shareReplay.js",
      "rxjs/add/operator/single": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/single.js",
      "rxjs/add/operator/skip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/skip.js",
      "rxjs/add/operator/skipLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/skipLast.js",
      "rxjs/add/operator/skipUntil": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/skipUntil.js",
      "rxjs/add/operator/skipWhile": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/skipWhile.js",
      "rxjs/add/operator/startWith": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/startWith.js",
      "rxjs/add/operator/subscribeOn": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/subscribeOn.js",
      "rxjs/add/operator/switch": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/switch.js",
      "rxjs/add/operator/switchMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/switchMap.js",
      "rxjs/add/operator/switchMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/switchMapTo.js",
      "rxjs/add/operator/take": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/take.js",
      "rxjs/add/operator/takeLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/takeLast.js",
      "rxjs/add/operator/takeUntil": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/takeUntil.js",
      "rxjs/add/operator/takeWhile": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/takeWhile.js",
      "rxjs/add/operator/throttle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/throttle.js",
      "rxjs/add/operator/throttleTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/throttleTime.js",
      "rxjs/add/operator/timeInterval": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/timeInterval.js",
      "rxjs/add/operator/timeout": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/timeout.js",
      "rxjs/add/operator/timeoutWith": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/timeoutWith.js",
      "rxjs/add/operator/timestamp": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/timestamp.js",
      "rxjs/add/operator/toArray": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/toArray.js",
      "rxjs/add/operator/toPromise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/toPromise.js",
      "rxjs/add/operator/window": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/window.js",
      "rxjs/add/operator/windowCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/windowCount.js",
      "rxjs/add/operator/windowTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/windowTime.js",
      "rxjs/add/operator/windowToggle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/windowToggle.js",
      "rxjs/add/operator/windowWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/windowWhen.js",
      "rxjs/add/operator/withLatestFrom": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/withLatestFrom.js",
      "rxjs/add/operator/zip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/zip.js",
      "rxjs/add/operator/zipAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/add/operator/zipAll.js",
      "rxjs/interfaces": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/interfaces.js",
      "rxjs/observable/ArrayLikeObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/ArrayLikeObservable.js",
      "rxjs/observable/ArrayObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/ArrayObservable.js",
      "rxjs/observable/BoundCallbackObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/BoundCallbackObservable.js",
      "rxjs/observable/BoundNodeCallbackObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/BoundNodeCallbackObservable.js",
      "rxjs/observable/ConnectableObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/ConnectableObservable.js",
      "rxjs/observable/DeferObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/DeferObservable.js",
      "rxjs/observable/EmptyObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/EmptyObservable.js",
      "rxjs/observable/ErrorObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/ErrorObservable.js",
      "rxjs/observable/ForkJoinObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/ForkJoinObservable.js",
      "rxjs/observable/FromEventObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/FromEventObservable.js",
      "rxjs/observable/FromEventPatternObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/FromEventPatternObservable.js",
      "rxjs/observable/FromObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/FromObservable.js",
      "rxjs/observable/GenerateObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/GenerateObservable.js",
      "rxjs/observable/IfObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/IfObservable.js",
      "rxjs/observable/IntervalObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/IntervalObservable.js",
      "rxjs/observable/IteratorObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/IteratorObservable.js",
      "rxjs/observable/NeverObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/NeverObservable.js",
      "rxjs/observable/PairsObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/PairsObservable.js",
      "rxjs/observable/PromiseObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/PromiseObservable.js",
      "rxjs/observable/RangeObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/RangeObservable.js",
      "rxjs/observable/ScalarObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/ScalarObservable.js",
      "rxjs/observable/SubscribeOnObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/SubscribeOnObservable.js",
      "rxjs/observable/TimerObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/TimerObservable.js",
      "rxjs/observable/UsingObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/UsingObservable.js",
      "rxjs/observable/bindCallback": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/bindCallback.js",
      "rxjs/observable/bindNodeCallback": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/bindNodeCallback.js",
      "rxjs/observable/combineLatest": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/combineLatest.js",
      "rxjs/observable/concat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/concat.js",
      "rxjs/observable/defer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/defer.js",
      "rxjs/observable/dom/AjaxObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/dom/AjaxObservable.js",
      "rxjs/observable/dom/WebSocketSubject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/dom/WebSocketSubject.js",
      "rxjs/observable/dom/ajax": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/dom/ajax.js",
      "rxjs/observable/dom/webSocket": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/dom/webSocket.js",
      "rxjs/observable/empty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/empty.js",
      "rxjs/observable/forkJoin": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/forkJoin.js",
      "rxjs/observable/from": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/from.js",
      "rxjs/observable/fromEvent": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/fromEvent.js",
      "rxjs/observable/fromEventPattern": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/fromEventPattern.js",
      "rxjs/observable/fromPromise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/fromPromise.js",
      "rxjs/observable/generate": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/generate.js",
      "rxjs/observable/if": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/if.js",
      "rxjs/observable/interval": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/interval.js",
      "rxjs/observable/merge": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/merge.js",
      "rxjs/observable/never": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/never.js",
      "rxjs/observable/of": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/of.js",
      "rxjs/observable/onErrorResumeNext": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/onErrorResumeNext.js",
      "rxjs/observable/pairs": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/pairs.js",
      "rxjs/observable/race": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/race.js",
      "rxjs/observable/range": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/range.js",
      "rxjs/observable/throw": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/throw.js",
      "rxjs/observable/timer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/timer.js",
      "rxjs/observable/using": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/using.js",
      "rxjs/observable/zip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/observable/zip.js",
      "rxjs/operator/audit": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/audit.js",
      "rxjs/operator/auditTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/auditTime.js",
      "rxjs/operator/buffer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/buffer.js",
      "rxjs/operator/bufferCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/bufferCount.js",
      "rxjs/operator/bufferTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/bufferTime.js",
      "rxjs/operator/bufferToggle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/bufferToggle.js",
      "rxjs/operator/bufferWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/bufferWhen.js",
      "rxjs/operator/catch": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/catch.js",
      "rxjs/operator/combineAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/combineAll.js",
      "rxjs/operator/combineLatest": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/combineLatest.js",
      "rxjs/operator/concat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/concat.js",
      "rxjs/operator/concatAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/concatAll.js",
      "rxjs/operator/concatMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/concatMap.js",
      "rxjs/operator/concatMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/concatMapTo.js",
      "rxjs/operator/count": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/count.js",
      "rxjs/operator/debounce": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/debounce.js",
      "rxjs/operator/debounceTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/debounceTime.js",
      "rxjs/operator/defaultIfEmpty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/defaultIfEmpty.js",
      "rxjs/operator/delay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/delay.js",
      "rxjs/operator/delayWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/delayWhen.js",
      "rxjs/operator/dematerialize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/dematerialize.js",
      "rxjs/operator/distinct": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/distinct.js",
      "rxjs/operator/distinctUntilChanged": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/distinctUntilChanged.js",
      "rxjs/operator/distinctUntilKeyChanged": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/distinctUntilKeyChanged.js",
      "rxjs/operator/do": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/do.js",
      "rxjs/operator/elementAt": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/elementAt.js",
      "rxjs/operator/every": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/every.js",
      "rxjs/operator/exhaust": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/exhaust.js",
      "rxjs/operator/exhaustMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/exhaustMap.js",
      "rxjs/operator/expand": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/expand.js",
      "rxjs/operator/filter": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/filter.js",
      "rxjs/operator/finally": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/finally.js",
      "rxjs/operator/find": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/find.js",
      "rxjs/operator/findIndex": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/findIndex.js",
      "rxjs/operator/first": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/first.js",
      "rxjs/operator/groupBy": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/groupBy.js",
      "rxjs/operator/ignoreElements": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/ignoreElements.js",
      "rxjs/operator/isEmpty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/isEmpty.js",
      "rxjs/operator/last": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/last.js",
      "rxjs/operator/let": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/let.js",
      "rxjs/operator/map": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/map.js",
      "rxjs/operator/mapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/mapTo.js",
      "rxjs/operator/materialize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/materialize.js",
      "rxjs/operator/max": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/max.js",
      "rxjs/operator/merge": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/merge.js",
      "rxjs/operator/mergeAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/mergeAll.js",
      "rxjs/operator/mergeMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/mergeMap.js",
      "rxjs/operator/mergeMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/mergeMapTo.js",
      "rxjs/operator/mergeScan": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/mergeScan.js",
      "rxjs/operator/min": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/min.js",
      "rxjs/operator/multicast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/multicast.js",
      "rxjs/operator/observeOn": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/observeOn.js",
      "rxjs/operator/onErrorResumeNext": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/onErrorResumeNext.js",
      "rxjs/operator/pairwise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/pairwise.js",
      "rxjs/operator/partition": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/partition.js",
      "rxjs/operator/pluck": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/pluck.js",
      "rxjs/operator/publish": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/publish.js",
      "rxjs/operator/publishBehavior": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/publishBehavior.js",
      "rxjs/operator/publishLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/publishLast.js",
      "rxjs/operator/publishReplay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/publishReplay.js",
      "rxjs/operator/race": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/race.js",
      "rxjs/operator/reduce": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/reduce.js",
      "rxjs/operator/repeat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/repeat.js",
      "rxjs/operator/repeatWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/repeatWhen.js",
      "rxjs/operator/retry": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/retry.js",
      "rxjs/operator/retryWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/retryWhen.js",
      "rxjs/operator/sample": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/sample.js",
      "rxjs/operator/sampleTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/sampleTime.js",
      "rxjs/operator/scan": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/scan.js",
      "rxjs/operator/sequenceEqual": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/sequenceEqual.js",
      "rxjs/operator/share": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/share.js",
      "rxjs/operator/shareReplay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/shareReplay.js",
      "rxjs/operator/single": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/single.js",
      "rxjs/operator/skip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/skip.js",
      "rxjs/operator/skipLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/skipLast.js",
      "rxjs/operator/skipUntil": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/skipUntil.js",
      "rxjs/operator/skipWhile": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/skipWhile.js",
      "rxjs/operator/startWith": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/startWith.js",
      "rxjs/operator/subscribeOn": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/subscribeOn.js",
      "rxjs/operator/switch": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/switch.js",
      "rxjs/operator/switchMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/switchMap.js",
      "rxjs/operator/switchMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/switchMapTo.js",
      "rxjs/operator/take": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/take.js",
      "rxjs/operator/takeLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/takeLast.js",
      "rxjs/operator/takeUntil": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/takeUntil.js",
      "rxjs/operator/takeWhile": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/takeWhile.js",
      "rxjs/operator/throttle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/throttle.js",
      "rxjs/operator/throttleTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/throttleTime.js",
      "rxjs/operator/timeInterval": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/timeInterval.js",
      "rxjs/operator/timeout": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/timeout.js",
      "rxjs/operator/timeoutWith": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/timeoutWith.js",
      "rxjs/operator/timestamp": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/timestamp.js",
      "rxjs/operator/toArray": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/toArray.js",
      "rxjs/operator/toPromise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/toPromise.js",
      "rxjs/operator/window": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/window.js",
      "rxjs/operator/windowCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/windowCount.js",
      "rxjs/operator/windowTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/windowTime.js",
      "rxjs/operator/windowToggle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/windowToggle.js",
      "rxjs/operator/windowWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/windowWhen.js",
      "rxjs/operator/withLatestFrom": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/withLatestFrom.js",
      "rxjs/operator/zip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/zip.js",
      "rxjs/operator/zipAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operator/zipAll.js",
      "rxjs/operators/audit": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/audit.js",
      "rxjs/operators/auditTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/auditTime.js",
      "rxjs/operators/buffer": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/buffer.js",
      "rxjs/operators/bufferCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/bufferCount.js",
      "rxjs/operators/bufferTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/bufferTime.js",
      "rxjs/operators/bufferToggle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/bufferToggle.js",
      "rxjs/operators/bufferWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/bufferWhen.js",
      "rxjs/operators/catchError": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/catchError.js",
      "rxjs/operators/combineAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/combineAll.js",
      "rxjs/operators/combineLatest": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/combineLatest.js",
      "rxjs/operators/concat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/concat.js",
      "rxjs/operators/concatAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/concatAll.js",
      "rxjs/operators/concatMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/concatMap.js",
      "rxjs/operators/concatMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/concatMapTo.js",
      "rxjs/operators/count": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/count.js",
      "rxjs/operators/debounce": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/debounce.js",
      "rxjs/operators/debounceTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/debounceTime.js",
      "rxjs/operators/defaultIfEmpty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/defaultIfEmpty.js",
      "rxjs/operators/delay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/delay.js",
      "rxjs/operators/delayWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/delayWhen.js",
      "rxjs/operators/dematerialize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/dematerialize.js",
      "rxjs/operators/distinct": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/distinct.js",
      "rxjs/operators/distinctUntilChanged": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/distinctUntilChanged.js",
      "rxjs/operators/distinctUntilKeyChanged": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/distinctUntilKeyChanged.js",
      "rxjs/operators/elementAt": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/elementAt.js",
      "rxjs/operators/every": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/every.js",
      "rxjs/operators/exhaust": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/exhaust.js",
      "rxjs/operators/exhaustMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/exhaustMap.js",
      "rxjs/operators/expand": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/expand.js",
      "rxjs/operators/filter": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/filter.js",
      "rxjs/operators/finalize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/finalize.js",
      "rxjs/operators/find": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/find.js",
      "rxjs/operators/findIndex": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/findIndex.js",
      "rxjs/operators/first": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/first.js",
      "rxjs/operators/groupBy": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/groupBy.js",
      "rxjs/operators/ignoreElements": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/ignoreElements.js",
      "rxjs/operators/index": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/index.js",
      "rxjs/operators/isEmpty": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/isEmpty.js",
      "rxjs/operators/last": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/last.js",
      "rxjs/operators/map": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/map.js",
      "rxjs/operators/mapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/mapTo.js",
      "rxjs/operators/materialize": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/materialize.js",
      "rxjs/operators/max": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/max.js",
      "rxjs/operators/merge": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/merge.js",
      "rxjs/operators/mergeAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/mergeAll.js",
      "rxjs/operators/mergeMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/mergeMap.js",
      "rxjs/operators/mergeMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/mergeMapTo.js",
      "rxjs/operators/mergeScan": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/mergeScan.js",
      "rxjs/operators/min": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/min.js",
      "rxjs/operators/multicast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/multicast.js",
      "rxjs/operators/observeOn": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/observeOn.js",
      "rxjs/operators/onErrorResumeNext": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/onErrorResumeNext.js",
      "rxjs/operators/pairwise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/pairwise.js",
      "rxjs/operators/partition": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/partition.js",
      "rxjs/operators/pluck": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/pluck.js",
      "rxjs/operators/publish": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/publish.js",
      "rxjs/operators/publishBehavior": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/publishBehavior.js",
      "rxjs/operators/publishLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/publishLast.js",
      "rxjs/operators/publishReplay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/publishReplay.js",
      "rxjs/operators/race": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/race.js",
      "rxjs/operators/reduce": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/reduce.js",
      "rxjs/operators/refCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/refCount.js",
      "rxjs/operators/repeat": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/repeat.js",
      "rxjs/operators/repeatWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/repeatWhen.js",
      "rxjs/operators/retry": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/retry.js",
      "rxjs/operators/retryWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/retryWhen.js",
      "rxjs/operators/sample": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/sample.js",
      "rxjs/operators/sampleTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/sampleTime.js",
      "rxjs/operators/scan": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/scan.js",
      "rxjs/operators/sequenceEqual": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/sequenceEqual.js",
      "rxjs/operators/share": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/share.js",
      "rxjs/operators/shareReplay": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/shareReplay.js",
      "rxjs/operators/single": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/single.js",
      "rxjs/operators/skip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/skip.js",
      "rxjs/operators/skipLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/skipLast.js",
      "rxjs/operators/skipUntil": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/skipUntil.js",
      "rxjs/operators/skipWhile": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/skipWhile.js",
      "rxjs/operators/startWith": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/startWith.js",
      "rxjs/operators/subscribeOn": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/subscribeOn.js",
      "rxjs/operators/switchAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/switchAll.js",
      "rxjs/operators/switchMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/switchMap.js",
      "rxjs/operators/switchMapTo": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/switchMapTo.js",
      "rxjs/operators/take": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/take.js",
      "rxjs/operators/takeLast": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/takeLast.js",
      "rxjs/operators/takeUntil": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/takeUntil.js",
      "rxjs/operators/takeWhile": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/takeWhile.js",
      "rxjs/operators/tap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/tap.js",
      "rxjs/operators/throttle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/throttle.js",
      "rxjs/operators/throttleTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/throttleTime.js",
      "rxjs/operators/timeInterval": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/timeInterval.js",
      "rxjs/operators/timeout": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/timeout.js",
      "rxjs/operators/timeoutWith": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/timeoutWith.js",
      "rxjs/operators/timestamp": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/timestamp.js",
      "rxjs/operators/toArray": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/toArray.js",
      "rxjs/operators/window": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/window.js",
      "rxjs/operators/windowCount": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/windowCount.js",
      "rxjs/operators/windowTime": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/windowTime.js",
      "rxjs/operators/windowToggle": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/windowToggle.js",
      "rxjs/operators/windowWhen": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/windowWhen.js",
      "rxjs/operators/withLatestFrom": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/withLatestFrom.js",
      "rxjs/operators/zip": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/zip.js",
      "rxjs/operators/zipAll": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/zipAll.js",
      "rxjs/scheduler/Action": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/Action.js",
      "rxjs/scheduler/AnimationFrameAction": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/AnimationFrameAction.js",
      "rxjs/scheduler/AnimationFrameScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/AnimationFrameScheduler.js",
      "rxjs/scheduler/AsapAction": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/AsapAction.js",
      "rxjs/scheduler/AsapScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/AsapScheduler.js",
      "rxjs/scheduler/AsyncAction": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/AsyncAction.js",
      "rxjs/scheduler/AsyncScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js",
      "rxjs/scheduler/QueueAction": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/QueueAction.js",
      "rxjs/scheduler/QueueScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/QueueScheduler.js",
      "rxjs/scheduler/VirtualTimeScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/VirtualTimeScheduler.js",
      "rxjs/scheduler/animationFrame": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/animationFrame.js",
      "rxjs/scheduler/asap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/asap.js",
      "rxjs/scheduler/async": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/async.js",
      "rxjs/scheduler/queue": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/scheduler/queue.js",
      "rxjs/symbol/iterator": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/symbol/iterator.js",
      "rxjs/symbol/observable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/symbol/observable.js",
      "rxjs/symbol/rxSubscriber": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/symbol/rxSubscriber.js",
      "rxjs/testing/ColdObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/testing/ColdObservable.js",
      "rxjs/testing/HotObservable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/testing/HotObservable.js",
      "rxjs/testing/SubscriptionLog": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/testing/SubscriptionLog.js",
      "rxjs/testing/SubscriptionLoggable": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/testing/SubscriptionLoggable.js",
      "rxjs/testing/TestMessage": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/testing/TestMessage.js",
      "rxjs/testing/TestScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/testing/TestScheduler.js",
      "rxjs/util/AnimationFrame": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/AnimationFrame.js",
      "rxjs/util/ArgumentOutOfRangeError": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/ArgumentOutOfRangeError.js",
      "rxjs/util/EmptyError": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/EmptyError.js",
      "rxjs/util/FastMap": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/FastMap.js",
      "rxjs/util/Immediate": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/Immediate.js",
      "rxjs/util/Map": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/Map.js",
      "rxjs/util/MapPolyfill": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/MapPolyfill.js",
      "rxjs/util/ObjectUnsubscribedError": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js",
      "rxjs/util/Set": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/Set.js",
      "rxjs/util/TimeoutError": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/TimeoutError.js",
      "rxjs/util/UnsubscriptionError": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/UnsubscriptionError.js",
      "rxjs/util/applyMixins": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/applyMixins.js",
      "rxjs/util/assign": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/assign.js",
      "rxjs/util/errorObject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/errorObject.js",
      "rxjs/util/identity": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/identity.js",
      "rxjs/util/isArray": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isArray.js",
      "rxjs/util/isArrayLike": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isArrayLike.js",
      "rxjs/util/isDate": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isDate.js",
      "rxjs/util/isFunction": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isFunction.js",
      "rxjs/util/isNumeric": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isNumeric.js",
      "rxjs/util/isObject": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isObject.js",
      "rxjs/util/isPromise": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isPromise.js",
      "rxjs/util/isScheduler": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/isScheduler.js",
      "rxjs/util/noop": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/noop.js",
      "rxjs/util/not": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/not.js",
      "rxjs/util/pipe": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/pipe.js",
      "rxjs/util/root": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/root.js",
      "rxjs/util/subscribeToResult": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/subscribeToResult.js",
      "rxjs/util/toSubscriber": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/toSubscriber.js",
      "rxjs/util/tryCatch": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/util/tryCatch.js",
      "rxjs/operators": "/Users/kyle/Projects/zieka.github.io/site/node_modules/rxjs/_esm5/operators/index.js"
    },
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts"
    ],
    "styles": [
      "./src/styles.scss"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].[chunkhash:20].bundle.js",
    "chunkFilename": "[id].[chunkhash:20].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.js$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    {
      "loader": "css-loader",
      "options": {
        "sourceMap": false,
        "importLoaders": 1
      }
    },
    {
      "loader": "postcss-loader",
      "options": {
        "ident": "postcss",
        "plugins": postcssPlugins
      }
    }
  ],
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    {
      "loader": "css-loader",
      "options": {
        "sourceMap": false,
        "importLoaders": 1
      }
    },
    {
      "loader": "postcss-loader",
      "options": {
        "ident": "postcss",
        "plugins": postcssPlugins
      }
    },
    {
      "loader": "sass-loader",
      "options": {
        "sourceMap": false,
        "precision": 8,
        "includePaths": []
      }
    }
  ],
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.less$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    {
      "loader": "css-loader",
      "options": {
        "sourceMap": false,
        "importLoaders": 1
      }
    },
    {
      "loader": "postcss-loader",
      "options": {
        "ident": "postcss",
        "plugins": postcssPlugins
      }
    },
    {
      "loader": "less-loader",
      "options": {
        "sourceMap": false
      }
    }
  ],
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    {
      "loader": "css-loader",
      "options": {
        "sourceMap": false,
        "importLoaders": 1
      }
    },
    {
      "loader": "postcss-loader",
      "options": {
        "ident": "postcss",
        "plugins": postcssPlugins
      }
    },
    {
      "loader": "stylus-loader",
      "options": {
        "sourceMap": false,
        "paths": []
      }
    }
  ],
  "publicPath": ""
})
      },
      {
        "test": /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          },
          "@ngtools/webpack"
        ]
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": {
        "caseSensitive": true,
        "collapseWhitespace": true,
        "keepClosingSlash": true
      },
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'all'
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new ExtractTextPlugin({
      "filename": "[name].[contenthash:20].bundle.css"
    }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new EnvironmentPlugin({
      "NODE_ENV": "production"
    }),
    new HashedModuleIdsPlugin({
      "hashFunction": "md5",
      "hashDigest": "base64",
      "hashDigestLength": 4
    }),
    new ModuleConcatenationPlugin({}),
    new UglifyJsPlugin({
      "test": /\.js$/i,
      "extractComments": false,
      "sourceMap": false,
      "cache": false,
      "parallel": false,
      "uglifyOptions": {
        "output": {
          "ascii_only": true,
          "comments": false
        },
        "ecma": 5,
        "warnings": false,
        "ie8": false,
        "mangle": true,
        "compress": {
          "pure_getters": true,
          "passes": 3
        }
      }
    }),
    new LicenseWebpackPlugin({
      "licenseFilenames": [
        "LICENSE",
        "LICENSE.md",
        "LICENSE.txt",
        "license",
        "license.md",
        "license.txt"
      ],
      "perChunkOutput": false,
      "outputTemplate": "/Users/kyle/Projects/zieka.github.io/site/node_modules/license-webpack-plugin/output.template.ejs",
      "outputFilename": "3rdpartylicenses.txt",
      "suppressErrors": true,
      "includePackagesWithoutLicense": false,
      "abortOnUnacceptableLicense": false,
      "addBanner": false,
      "bannerTemplate": "/*! 3rd party license information is available at <%- filename %> */",
      "includedChunks": [],
      "excludedChunks": [],
      "additionalPackages": [],
      "pattern": /^(MIT|ISC|BSD.*)$/
    }),
    new PurifyPlugin(),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.prod.ts"
      },
      "sourceMap": false,
      "tsConfigPath": "src/tsconfig.json",
      "exclude": [
        "**/*.spec.ts",
        "test.ts"
      ],
      "compilerOptions": {}
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
