主に2つの使い方があります。

- ゲームコントローラーの入力を配信画面に表示する（Controller/KeyLogモード）  
- ゲームコントローラーのボタンに動画・音声・画像・HTMLファイルを割当てる（Deckモード）  

[カスタマイズやDeckモードで制限はありますがダウンロードせずに動かすことは可能](https://codelelou.github.io/GameInputDisplay/index.html)なので、XInput対応ゲームコントローラーを接続の上、お試し・動作確認してみてください。  
初期設定は「Controller/KeyLogモード」ですが、パラメーター設定でモード変更など行えます（[デバッグモード](https://codelelou.github.io/GameInputDisplay/index.html?modes=Debug)の「パラメーター設定ジェネレーター」が便利です）。  

ダウンロードはGitHubページ上部にある緑色の［Code］ボタンを開き、[［Download ZIP］ボタン](https://github.com/codelelou/GameInputDisplay/archive/refs/heads/main.zip)からできます。  

元々は自分用として格闘ゲーム「ストリートファイターV」のゲーム実況用に開発しました。  
配信ソフトに「[OBS](https://obsproject.com/ja/)」を使っているので、説明もOBS向けになっていますが、他の配信ソフトでもOBSと同等の機能があれば使用はできると思います。  

コントローラースキンは画像の差し替えだけでもカスタマイズ可能（ベースの画像と押したボタンの差分画像で構成）にしています。  
設定・カスタマイズは配信ソフト「OBS」のブラウザソースのプロパティから、URLパラメーター設定とカスタムCSSで行います。  

# 注意・制約・制限  

プレイするゲームとは別にコントローラーの入力情報を取得・処理しているため、入力内容が一致しない場合があります。  

OBSのブラウザソースとして本ソフトウェアを表示する場合、一部のコントローラーが認識できない場合があります。  
**DualShock4（PS4純正パッド）は無線接続だと入力情報を取得できなくなる場合があり、このような時は有線接続をお試しください**。  

## Gamepad API  

入力情報の取得はGamepad API（Web API）を使用（依存）しているため、**XInput未対応のゲームコントローラーやキーボードなどには対応しておりません**。  

パソコンに接続している最大4つまでのゲームコントローラーを識別でき、パラメーター設定「controller」で入力を取得する対象のゲームコントローラーを指定できます。  
PCゲームをゲームコントローラーでプレイする場合でも、他に接続しているゲームコントローラーを指定することでDeckモードを使用することができます。

Gamepad APIの仕様上、ループ処理でゲームコントローラーの情報（どのボタンが押されているかなど）を取得しているため、ループ間隔の空白の時間にのみ押されたボタンの情報は取得できません。  
ループ間隔はパラメーター設定「delay」で指定可能できます。  

## 仕様変更  

### version.01.05.03以降

バージョン「01.05.03」から、コントローラースキンの表示位置が右下を起点に表示するように仕様変更になりました。  

キーログは従来どおり、左上を起点に表示したままです。  
ただしパラメーター設定「styles」に「KeyLog_Horizontally_DU」を指定している場合は、コントローラースキンは右上を起点に、キーログは左下を起点にして表示します。  

これはキーログの横表示方向対応による仕様変更になります。  

# 使い方  

配信ソフトOBSのソースに、本ソフトウェア（index.html）を「ブラウザ」として設定することで使用できるようになります。  

その際はブラウザソースのプロパティの「URL」に「`http://absolute/C:/GameInputDisplay/index.html`」のように設定してください（ローカルファイルパスの頭に「`http://absolute/`」をつける）。  
**「ローカルファイル」として設定するとパラメーター設定ができなくなるので注意**してください。  

ダウンロードせずに「`https://codelelou.github.io/GameInputDisplay/index.html`」と設定することでも動作はしますが、オフライン環境やサーバーが落ちている時などは使用できませんし、処理に遅延が発生しやすいかもしれません。  
また**Deckモードでローカルファイルを指定する場合はダウンロードして使用**する必要があります（ブラウザの制約のため）。  

幅と高さは配信画面と同じにすると良いと思います（OBSの初期設定は800×600と小さめ）。  
DeckモードをOBSで使用する場合は「OBSを介して音声を制御する」の項目を有効にしていると、OBS側でも音声の調整ができるようになるかと思います。  

OBS起動のたびにコントローラースキンの各ボタンの差分画像の読み込みに時間がかかる場合があります。配信前に全てのボタンやスティックを操作して差分画像を表示させておくことで画像がキャッシュされて遅延が改善されるかと思います。  
これは標準のコントローラースキンをシンプルにしてCSS初心者でもカスタマイズに挑戦しやすいように、差分画像の自動キャッシュしない作りにしているためです。  

## Controller/KeyLogモードのサイズ・表示位置などの調整

配信ソフトOBSを使用する場合の解説になりますが、他の配信ソフトでも似たような機能や項目があれば同じように設定できるかと思います。  
他のソースと同じような感覚で配信ソフトのシーン・ソース管理機能でサイズや表示位置、不透明度の設定する手順になります（カスタムCSSの設定が不要）。  

まずは本ソフトウェア専用シーンとして、新規「シーン」を追加します。  
このシーンのソースにはブラウザソースとして本ソフトウェアを追加します。  

URLは「`http://absolute/C:/GameInputDisplay/index.html`」のように設定（ご自身の環境に合わせて「`http://absolute/`」以降を変更してください）し、幅と高さは配信画面と同じにします。  
本ソフトウェアを表示しない時に無駄なプログラムは走らないように「表示されてないときにソースをシャットダウン」の項目も有効にします（チェックを入れる）。  

次にゲームコントローラー用とキーログ用として2つのシーンを作成します。  
これらのシーンのソースには、シーンソースとして先程追加した本ソフトウェア専用シーンを追加します（シーンを分けることで個別に不透明度の設定などができるようになります）。  

ゲームコントローラー用シーンにはゲームコントローラーのみが、キーログ用シーンにはキーログのみが表示されるようにクロップ（切り取り）します。  
拡大縮小するような感じで**サイズ調整をaltキーを押しっぱなしですることでクロップの調整ができます**。  
**キーログはゲームコントローラーの入力がないと表示されない**ので、パソコンに使用するコントローラーを接続し、いくつか入力を行ってキーログを表示してください（ゲームの起動は不要です）。  

サイズ調整をリセットしたい場合は、リセットしたいソースを右クリックし「変換」メニューの「変換をリセット」を実行してください（そのソースがロック状態の場合はロックを解除してください）。  

あとは他のソースと同じように、お好みのシーンのソースにゲームコントローラー用シーンやキーログ用シーンをシーンソースとして追加し、サイズや表示位置の調整をするだけです。  
そのシーンソースのフィルタに「カラーキー」を追加することで、「不透明度」の調整もできます。  

なおコントローラースキンの縦横の比率はスキンによって異なりますし、キーログも表示するボタン数もキーログ用カスタムCSS（キーコンフィグ）で異なります。
コントローラースキンとキーログの切替はパラメーター設定「styles」で行います（初期設定はPS4純正パッド向けになってますが、標準でアケコンやHitBox風のコントローラースキンや、ストリートファイターV使用のキーログを用意しています）。

コントローラースキンのカスタマイズなどは最初に作成したシーンのブラウザソースの「カスタムCSS」で設定してください。  
複数のコントローラースキンをカスタムCSSに別スタイル名で設定しておけば、そのブラウザソースのURLのstylesパラメーターを変更することでスキンを切替えれます。  

シーンソースの切替えでスキンを切り替えたい場合は、スキン別にシーンを作成し、それぞれにブラウザソースとして本ソフトウェアを設定し、さらにそれらのシーンを元にスキン毎にゲームコントローラー用とキーログ用のシーンを作る必要があります。  
ゲームによってコントローラーが違うなど頻繁にスキンを切替える場合は、スキン別にシーンを作成する方法が向いているかもしれません。  

後はお好みに応じてパラメーター設定を行ってください。  
例えばアケコンでストリートファイターVをプレイする場合は、URLを「`http://absolute/C:/GameInputDisplay/index.html?styles=ArcadeController,KeyLog_StreetFighterV`」のようにしてパラメーター設定を行います。  

# パラメーター設定

本ソフトウェアの各種設定は、「`index.html?delay=4&log=20&excludes=8,9,11&styles=ButtonBox,KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK`」のようにパラメーターから指定できます。  
**スペースや全角などが含まれているような場合は、正常に本ソフトウェアが動作しない場合があります**。  

パラメーター設定「modes」に「Debug」を指定（「`index.html?modes=Debug`」）することで、**デバッグモードから「パラメーター設定ジェネレーター」を使用できます**。  

## modes

既定値：Controller,KeyLog  

- Controller
- KeyLog
- Deck
- Debug

以上のモードがあり、「Controller」と「KeyLog」は併用できます。  

コントローラーかキーログのどちらか一方のみを表示したい場合は「`index.html?modes=Controller`」のように指定します。  

デバッグモード（「`index.html?modes=Debug`」）が有効の場合は、コントローラーもキーログも両方表示されます。  
デバッグモードでは本ソフトウェアのバージョンや各パラメーター設定内容の確認、パソコンに繋いでいるコントローラーの情報（接続Indexやボタン番号など）を確認できます。  

### Controller（コントローラースキン）  

ゲームコントローラーを模した画像（スキン）が表示され、視覚的に押しているボタンなどを表示します。  

### KeyLog（キーログ）  

どのボタンを押したかなど、入力履歴を表示します。  

### Deck（デッキ）  

ゲームコントローラーの各ボタンに動画・音声・画像・HTMLファイルを割り当てることができます。  
ファイルの割り当てはパラメーター設定「deck」で指定します。  

OBS（Windows10）でバックグラウンド操作できることを確認していますが、**使用するハード・ソフトや使用環境・状況などによってブラウザや配信ソフトでバックグラウンドで動作できない場合があります**。  

動画・音声ファイルはループ再生されますが、同じボタンを押すことで再生・一時停止を切り替えることができます。  

配信の待機用ファイルやBGMをボタン操作で切り替えるといった使い方ができます。  
Stream Deckのような配信ソフトのシーンを切り替えたり、アプリケーションを起動したり、マクロを登録したりする機能はありません。  

知識・技術があればHTMLファイルに特殊なプログラムを行わせることができるかもしれません。  

#### Clear（クリアボタン）

既定値（ボタン番号）：0  

クリアボタンを押すと表示・再生中のファイルを非表示・停止します。  
表示したファイルを非表示にする時はこのクリアボタンを押してください。  

止めたい音声ファイルのボタンがわからなくなったような時にも、このクリアボタンを押すことで停止することができます（クリアボタンは「一時停止」ではなく「停止」になります）。  

非表示をクリアボタンで行う仕様は、ライブ配信中に咄嗟に画像で配信画面を隠したいような時に、ボタンを2回押したせいで画像が非表示になってしまい隠せていないようなトラブルを避けるためです。  

HTMLファイル内の動画や音声はそのHTMLファイルの処理に依存しており、クリアボタンを押しても一時停止・停止の処理は行いません（HTMLファイル自体は非表示になります）。  
このような場合はリセットボタンでメモリ上の読み込んだファイルを削除することで停止できると思います（ファイル自体は削除されません）。

#### Reset（リセットボタン）

既定値（ボタン番号）：11  

メモリ上の読み込んだファイルを削除します（ファイル自体は削除されません）。  
音量はリセットされません。  

通常はリセットボタンではなくクリアボタンを使います。  
ファイルを再読み込みしたいような場合にリセットボタンを使います。  

#### 音量調整

既定値：（十字キーボタン・左スティックの上下）  

十字キーボタン・左スティックの上下入力で動画・音声ファイルの音量の上げ下げを行えます（HTMLファイル内の動画・音声はHTMLファイル側で処理が必要です）。  
既定音量は「50」で、ミュートから最大まで（0～100）を10間隔で調整できます。  

**音量は全ファイル共有**で、ミュート状態で別ファイルを再生してもミュートのまま再生され、最大状態では音量最大で再生されます。  
特に最大音量に差があるファイルを使用するような場合は注意してください（**配信ソフトで音量に制限をかけれる**場合があります）。  

十字キーボタンはパラメーター設定「directionals」で割り当てるボタン番号を変更できるので、存在しないボタン番号に割り当てることで、十字キーボタンにもファイルを割り当てることができます。  
十字キーボタンとは別に左スティックがあるコントローラーを使用する場合は割り当てれるボタンを増やすことができます。  

#### スキップ

既定値：（十字キーボタン・左スティックの左右）  

十字キーボタン・左スティックの左右入力で動画・音声ファイルのスキップ（前後5秒）できます（HTMLファイル内の動画・音声はHTMLファイル側で処理が必要です）。  

複数の動画・音声ファイルを再生している場合は、それらの再生中のファイルのみスキップされます。  
音声ファイルを再生しながら動画をスキップすると、音声ファイルも同じようにスキップします（一時停止中の動画は表示中でもスキップはできません）。  

十字キーボタンはパラメーター設定「directionals」で割り当てるボタン番号を変更できるので、存在しないボタン番号に割り当てることで、十字キーボタンにもファイルを割り当てることができます。  
十字キーボタンとは別に左スティックがあるコントローラーを使用する場合は割り当てれるボタンを増やすことができます。  

## controller

既定値：0  

複数のコントローラーを繋いでいる場合は、入力を表示したいコントローラーのIndexを指定してください。  
最大4台までのコントローラーを認識できます（0～3）。  

デバッグモードで接続中のゲームコントローラーのIndexを確認することができます。 

## delay

既定値：8

ゲームコントローラーの入力状態はループ処理でチェックしており、そのループの**最短**の間隔をミリ秒で指定することができます。  
この仕様はGamepad APIによるものです（ボタンが押された時にのみ処理を行うことができないため、ループ処理でゲームコントローラーの情報を取得しています）。  

そのため**再取得するまでの空白の時間（delay）の入力情報は取得できません**し、複数同時押しの場合でもミリ秒単位のズレがあると同時押しとして表示されない場合があります。  
これは本ソフトウェアでの表示であり、プレイ中のゲーム内の処理とは関係ありません。  

**ループ間隔が短すぎるとパソコンに過度の負荷が掛かったり、ブラウザの制約などにより指定した間隔で動作しない**場合があります。  
4ミリ秒未満を指定した場合は、ブラウザの内部処理で強制的に4ミリ秒を基準として処理が行われることが多いようです。  

Windowsであればタスクマネージャーの「プロセス」から配信ソフトのCPU使用率などをチェックできます（ゲーム未起動・未配信状態で、本ソフトウェアの専用ソースのみ表示してチェックする方が負荷の切り分けがしやすいかと思います）。  
ゲームコントローラー入力中の方が多くの処理が行われるため、ボタン等を色々押しながらチェックしてください。  

## excludes

既定値はありません。  

入力を無視したいボタンの番号を「`index.html?excludes=8,9,11`」のように、半角カンマ区切りで指定します。  

これは本ソフトウェア用の設定のため、**プレイ中のゲームなどには影響しません**。  

## converts

既定値はありません。  

ボタン番号を変換したい場合に「`index.html?converts=10-4,10-1,11-12,11-14,11-15,9-0`」のように、半角カンマ区切りで指定します。  
「x-y」と「x」には変換元の番号（押されたボタン）を、「y」には変換先の番号を指定し、それらを「-」（半角ハイフン）で繋ぎます。  
1つのボタン番号に複数のボタン番号を割当てたい場合は「14-2,14-3,14-4」のように指定し、変換元のボタンも押されたままにしたい場合は「14-2,14-3,14-4,14-14」のように変換元と変換先のボタン番号のセットも指定してください。  

これは本ソフトウェア用の設定のため、**プレイ中のゲームなどには影響しません**。  

パラメーター「excludes」が優先されるため、「excludes」で指定したボタン番号を「converts」で変換元に指定していしても入力そのものが無視されます。  
ただし「excludes」で指定したボタン番号を「converts」の変換先に指定することは可能です。  


## directionals

既定値：12-13-14-15  

バージョン「01.03.00」から追加したパラメーター設定になります。  

- 上 = ボタン番号12  
- 下 = ボタン番号13  
- 左 = ボタン番号14  
- 右 = ボタン番号15

十字キーボタンの上下左右のボタン番号を指定します。  

ボタン番号（半角数字）を半角ハイフン（「-」）で左から順に「上」「下」「左」「右」と繋ぎます。  
複数のボタン番号を指定する場合は「`index.html?directionals=10,12-11,13-14-15`」のように、半角カンマ（「,」）で区切ります。  

パラメーター「excludes」が優先されるため、「excludes」で指定したボタン番号を指定しても入力そのものが無視されます。  

## log

既定値：30

キーログの**最大**表示件数を指定します。  
1～100の整数に対応しています（ログ数が多いほど負荷が高くなります）。  

入力内容によってはキーログのCSS（キーコンフィグ）により非表示になるログもあるため、指定件数より実際に表示されるのは少ない可能性があります。  

## items  

既定値：40  

キーログのアイテム数を1以上の整数で指定します。  
主にカスタムキーコンフィグ（カスタムCSS）用で、キーログに多種類のアイコンを表示する場合に設定するパラメーターとして用意しています。  

キーログの最大件数（行数）はパラメーター設定「log」で行います。  

## deck  

Deckモードでゲームコントローラーのボタンに割り当てるファイルを指定します。  
対応ファイルは次の通りです。  

- ビデオ（*.mp4 *.webm）
- オーディオ（*.wav *.wave *.mp3 *.ogg *.aac *.flac）
- 画像（*.png *.jpeg *.jpg *.gif *.bmp）
- Webページ（*.html *.htm）

一部のファイルは正常に表示・再生できない場合はあります。  
ブラウザに依存しているため、H.265/HEVCの動画ファイルなどはOSやブラウザなどが対応しないと正常に表示・再生できません。  

ファイルの種類は拡張子（「.mp4」や「.png」など）でファイルの種類を識別しており、いずれにも当てはまらない場合はWebページとして扱います。  
Webページはiframe（仮想ブラウザフレーム）として表示するのですが、Webサイト側でフレーム表示を禁止しているような場合は、Webページのアドレスを指定しても正常に表示されません。  

１つのボタン番号に複数のファイルパスを指定した場合、そのボタンで複数のファイルの表示・再生を切り替えます。  
複数のボタン番号に同じファイルパスを指定した場合、そのファイルを複数のボタンで共有するため複数表示・再生にはなりません（同じファイルをコピー・リネームする必要があります）。  

ファイルパスは絶対パス・フルパスか相対パスで、「{ボタン番号}-{ファイルパス}」のようにボタン番号とファイルパスを半角ハイフン（「-」）で繋ぎます。  
複数指定する場合は半角カンマ（「,」）で区切ります。  

**ファイルパスはURLエンコードが2回必要（「{ボタン番号}-`encodeURIComponent(encodeURIComponent(ファイルパス))`」）**です。  
[デバッグモード](https://codelelou.github.io/GameInputDisplay/index.html?modes=Debug)のパラメーター設定ジェネレーターが便利です。  

### 特殊ボタン  

次の特殊ボタンは処理が優先（他を無視）されますが、パラメーター設定で変更可能です。  

- リセット（既定ボタン番号：11）
- クリア（既定ボタン番号：0）
- 音量調整（既定ボタン番号：12,13）
- スキップ（既定ボタン番号：14,15）

ファイルパスの代わりにリセットボタンは「Reset」を、クリアボタンは「Clear」を指定して変更します（例：「{ボタン番号}-Reset」）。

音量調整ボタンとスキップボタンはパラメーター設定「directionals」で変更します。  
十字キーボタンとは別に左スティックがあるゲームコントローラーであれば、「directionals=99-99-99-99」のように存在しないボタン番号を設定すると、十字キーボタンにもファイルを割り当てることができます。  

### サイコロHTMLファイル（./deck/Dices/dices.html）

方向入力で操作可能なサイコロツール（Deckモード用HTMLファイルのサンプル）。  

十字キーボタン・左スティック・右スティックのいずれでも操作可能ですが、十字キーボタンと左スティックだとマスター音量や同時に表示・再生中の動画・音声ファイルと干渉するため、**右スティックでの操作を推奨**します。  
またDeckモードではゲームコントローラーの入力は共有のため、他のファイルの同時表示中は操作が干渉する場合があります。このファイルを表示する前にクリアボタンを押して他のファイルを非表示にしておくことで干渉を避けることができます。  

ボタンか入力欄がフォーカス中の時に操作可能で、フォーカス中は縁に黒い影ができ背景がゆっくり赤く点滅します（サイコロ停止中のみボタンは点滅しません）。  
横入力でフォーカスの移動ができます。  

ボタン（［Stop］か［Roll］）がフォーカス中は、下入力でサイコロを止めたり振ったりできます。  
サイコロが止まるとサイコロの目の合計値が表示されます。  

面入力欄か個数入力欄がフォーカス中は、上下の入力で値を増減できます。  
面は2～99、個数は1～9の間で設定できます。  

#### サイコロの目をカスタマイズ

「`./deck/Dices/dices.html?labels=A,2,3,4,5,6,7,8,9,10,J,Q,K`」のように、サイコロの目を指定することもできます。  
サイコロの目は2つ以上必要で、半角カンマ（「,」）で区切ります。  

labelsパラメーターが有効な場合は面入力欄と合計値が非表示になります。  

## styles

既定値：ProPad,KeyLog_ButtonSymbol_PS_DualShock  

PlayStation4純正パッド（DualShock4）での標準的な使用ケースの割合の多さを想定し、stylesを指定することなく使用できるように規定値を変更しました。  
「ProPad」がコントローラースキン用のスタイル名で、「KeyLog_ButtonSymbol_PS_DualShock」がキーログ用のスタイル名です。  
バージョン「01.03.00」未満の既定値は「Front6Pad」でした。  

コントローラースキンやキーログ用キーコンフィグプリセットの指定ができます。  

キーコンフィグプリセットを指定する際は、「`index.html?styles=Front6Pad,B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VShift_B7HK`」のように半角カンマ区切りでコントローラースキンも指定してください。  
**コントローラースキンが未設定状態の場合はコントローラーが表示されない**場合があります。  

### コントローラースキン

- ProPad（既定・DualShock4/DualSense風）
- Front6Pad（6ボタンゲームパッド風）
- ArcadeController（アーケードコントローラー風）
- ButtonBox（HitBox・レバーレスコントローラー風）
- DualBox（HitBox Cross|Up風）

標準でこれらのコントローラースキンを指定できます。  

### オーバーレイ用スタイル（特殊）

オーバーレイ用スタイルは本ソフトウェアの応用的な利用法になります。  
ゲームコントローラーの入力によってコントローラースキンの画像が切り替わる仕組みを応用し、ゲームコントローラーで配信画面に表示する画像を切り替えれるようにするというものです。  

ライブ配信でゲームプレイ中などに配信ソフトを操作できない時や、咄嗟に配信画面を隠したいような時に、ゲームコントローラーをリモコン代わりにボタンに割り当てた画像を表示できるようにする方法です。 

**パラメーター設定「controller」で操作に使うゲームコントローラーは指定できる**ので、ゲームコントローラーでPCゲームをプレイ中でも別のゲームコントローラーを繋げて操作することができます。

**通常のコントローラースキンやキーログの表示とは一緒に使用できないため、配信ソフトには新たにオーバーレイ用ブラウザソースとして追加する必要があります。**

表示するPNG画像はオーバーレイ用フォルダに「Button_X.png」（「X」はボタン番号に置き換える）というファイル名で保存します。  
標準でボタン番号0～19に対応しています。  
ただしOSや他のソフト（steamクライアントなど）によっては、**特殊ボタン（PSボタンなど）を押すとメニューが表示されることがあるので注意**してください。  

サンプルとして「Button_0.png」を用意しています。

画像の寸法・比率は配信画面に合わせると自動的にフィットするので調整しやすいと思います。
APNGというアニメーションPNGであれば、画像をアニメーションさせることも可能です。  

#### Overlays  

このスタイルはゲームコントローラーのボタンが押された時に、そのボタン番号に対応する画像があった場合にその画像を表示し続けます。  
画像を割当てていないボタンを押すかスティックを操作することで非表示にできます。  

**パラメーター設定「modes」を「KeyLog」にして動作**させる必要があり、「`index.html?modes=KeyLog&styles=Overlays`」のように指定します。  

画像ファイルの保存先は「skins」フォルダ内の「Overlays」フォルダになります。  

#### FlashOverlays

このスタイルはゲームコントローラーのボタンが押されている間だけ、そのボタン番号に対応する画像があった場合にその画像を表示します。

**パラメーター設定「modes」を「Controller」にして動作**させる必要があり、「`index.html?modes=Controller&styles=FlashOverlays`」のように指定します。

なお、**ボタンを連打すると画像が高速点滅状態になり、画面を見ているリスナーさんなどの健康を害する恐れがあり非常に危険**です。  
過去にはテレビアニメのポケモンにおいて画面の点滅により救急搬送されるといった事故も起きています。  
事故や事件につながりかねないので注意してください。  

画像ファイルの保存先は「skins」フォルダ内の「FlashOverlays」フォルダになります。  

# キーログ（キーディスプレイ）

キーコンフィグはCSSで設定可能です。  
配信ソフトOBSの場合はブラウザソースのプロパティの「カスタムCSS」に設定します。

標準でいくつかキーコンフィグプリセットを用意しており、「`index.html?styles=Front6Pad,KeyLog_StreetFighterV`」のようにパラメーターで指定することができます。  
**「styles」パラメーターを指定する時は、コントローラースキンの指定を忘れない**ようにしてください（キーログのみ指定するとコントローラーが表示されない場合があります）。  

標準で用意しているキーコンフィグのプリセットは次の通りです（独自のキーコンフィグの設定する際の参考にもなるかと思います）。

## コマンド表示（十字キー・方向キー・左スティック）

左右両方の入力がある場合は、左右両矢印を表示します。  
左右両方入力に加え上下の入力が一方でもある場合は、左右の入力は無視し、上矢印か下矢印を表示します。  
上下のがどちらも入力されている場合は、上矢印を表示します。  

## キーログ横方向表示

通常、キーログは左上を起点として最新の入力が上に追加表示され、他に同時に入力されているものが右に横並びに表示され、履歴は上から下に流れるように表示されます。  

次のスタイル名をパラメーター設定「styles」に追加することで、キーログが横に流れるように表示されます。  

- KeyLog_Horizontally_UD
- KeyLog_Horizontally_DU

「KeyLog_Horizontally_UD」はコマンド表示が上に、他に同時に入力されているものが下に縦並びに表示され、履歴は左から右に流れるように表示されます。  

「KeyLog_Horizontally_DU」は「KeyLog_Horizontally_UD」の天地を逆にした感じになり、コマンド表示が下に、他に同時に入力されているものが上に縦並びに表示され、履歴は左から右に流れるように表示されます。  
**「KeyLog_Horizontally_DU」を設定している時は、キーログが左下を起点に、コントローラースキンが右上を起点にした表示に変わる**ので注意してください。  

「`index.html?styles=ProPad,KeyLog_ButtonSymbol_PS_DualShock,KeyLog_Horizontally_UD`」のように指定します。  

## KeyLog_ButtonSymbol_PS_DualShock

パラメーター設定「styles」で既定のキーコンフィグで、PlayStation4純正パッド（DualShock4）のボタン表記に合わせています。  

- ボタン0 = ×
- ボタン1 = 〇
- ボタン2 = □
- ボタン3 = △
- ボタン4 = L1
- ボタン5 = R1
- ボタン6 = L2
- ボタン7 = R2
- ボタン8 = SHARE
- ボタン9 = OPTIONS
- ボタン10 = L3（左スティック押込）
- ボタン11 = R3（左スティック押込）
- ボタン12 = 上（十字ボタン）
- ボタン13 = 下（十字ボタン）
- ボタン14 = 左（十字ボタン）
- ボタン15 = 右（十字ボタン）
- ボタン16 = PSボタン
- ボタン17 = タッチパッド／タッチパッドボタン

非純正DualShock4風コントローラーなどではボタン配置（番号）がことなる可能性があるため、正常に表示されない場合があります。  
また日本国内向けのDualShock4で設定・確認を行ったため、海外仕様のDualShock4でも正常に表示されない可能性もあります。  

## KeyLog_StreetFighterV  

対戦格闘アクションゲーム「ストリートファイターV」のプレイを想定したキーコンフィグになっています。  
「`index.html?styles=Front6Pad,KeyLog_StreetFighterV`」のように指定します。

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 弱中強パンチ同時押し  
- ボタン5 = 強パンチ  
- ボタン6 = 弱中強キック同時押し  
- ボタン7 = 強キック  

**アケコンなど格闘ゲーム向けのコントローラーのボタン配置（番号）向け**のため、コントローラーによっては適切に表示されない場合があります。  
PS4純正パッドを使用する場合は「`KeyLog_SFV_ProPad`」が向いていると思われます。  

### KeyLog_SFV_ProPad

「ストリートファイターV」向けのキーコンフィグをPS4純正パッド向けにカスタマイズしたものです。  
「`index.html?styles=ProPad,KeyLog_SFV_ProPad`」のように指定します。

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 強パンチ  
- ボタン5 = 強キック  
- ボタン6 = 弱中強パンチ同時押し  
- ボタン7 = 弱中強キック同時押し  

### パラメーター「styles」のみでカスタムキーコンフィグを設定する  

パラメーター設定「styles」のみ（カスタムCSS不要）でカスタムキーコンフィグを設定することも可能です。  
ほとんどのゲームコントローラーで設定可能だと思いますが、一部例外があるかもしれません。  

ボタン番号毎に弱中強のパンチ・キックを指定したスタイル名を半角カンマ（「,」）で繋げてstylesパラメーターに設定する感じになります。  
使用するゲームコントローラーの**ボタン番号はデバッグモード（`index.html?modes=Debug`）で調べることができます**。  

プリセットとして弱中強のアクションのそれぞれに**ボタン番号0～19までスタイル名を用意しています**。 
スタイル名は「KeyLog_SFV_KC_アクション_ボタン番号」の書式で、次のようになっています（末尾の「X」を割り当てるボタン番号に置き換えてください）。  

- 弱パンチ = KeyLog_SFV_KC_PL_X  
- 中パンチ = KeyLog_SFV_KC_PM_X  
- 強パンチ = KeyLog_SFV_KC_PH_X  
- 弱キック = KeyLog_SFV_KC_KL_X  
- 中キック = KeyLog_SFV_KC_KM_X  
- 強キック = KeyLog_SFV_KC_KH_X    

例えば次のようにカスタムキーコンフィグを設定するとします。

- ボタン0 = KeyLog_SFV_KC_KL_0 = 弱キック  
- ボタン1 = KeyLog_SFV_KC_KM_1 = 中キック  
- ボタン2 = KeyLog_SFV_KC_PL_2 = 弱パンチ  
- ボタン3 = KeyLog_SFV_KC_PM_3 = 中パンチ  
- ボタン4 = KeyLog_SFV_KC_PL_4,KeyLog_SFV_KC_KL_4 = 弱パンチ・弱キック同時押し（投げ）  
- ボタン5 = KeyLog_SFV_KC_PH_5 = 強パンチ  
- ボタン6 = KeyLog_SFV_KC_PH_6,KeyLog_SFV_KC_KH_6 = 強パンチ・強キック同時押し（Vトリガー）  
- ボタン7 = KeyLog_SFV_KC_KH_7 = 強キック  

この場合のキーコンフィグ用スタイル名は「`KeyLog_SFV_KC_KL_0,KeyLog_SFV_KC_KM_1,KeyLog_SFV_KC_PL_2,KeyLog_SFV_KC_PM_3,KeyLog_SFV_KC_PL_4,KeyLog_SFV_KC_KL_4,KeyLog_SFV_KC_PH_5,KeyLog_SFV_KC_PH_6,KeyLog_SFV_KC_KH_6,KeyLog_SFV_KC_KH_7`」になります。  

パラメーター設定「styles」を指定する際は同時にコントローラースキンの指定が必要になりますので、「`index.html?styles=DualBox,KeyLog_SFV_KC_KL_0,KeyLog_SFV_KC_KM_1,KeyLog_SFV_KC_PL_2,KeyLog_SFV_KC_PM_3,KeyLog_SFV_KC_PL_4,KeyLog_SFV_KC_KL_4,KeyLog_SFV_KC_PH_5,KeyLog_SFV_KC_PH_6,KeyLog_SFV_KC_KH_6,KeyLog_SFV_KC_KH_7`」のように指定します。  

### KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 弱パンチ・弱キック同時押し（投げ）  
- ボタン5 = 強パンチ  
- ボタン6 = 強パンチ・強キック同時押し（Vトリガー）  
- ボタン7 = 強キック  

ストリートファイターVでR1ボタンに投げを、R2ボタンにVトリガーを設定した場合の標準的なキーコンフィグのプリセットになります。  
一般的なアケコンなどのボタン配置（番号）向けのため、PS4純正パッドなどには向きません。  

#### CSS（キーコンフィグ）の解説

パラメーター設定「styles」ではなく、カスタムCSSでカスタムキーコンフィグを設定するような場合の参考にしてください。  
カスタムCSSであればアイコンや色、表示順などより細かくカスタマイズ可能ですし、別のゲームタイトル仕様のキーログのスタイルにすることも可能です。  

~~~
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul[class*="Button_"] > li:not(:nth-child(1))::after {
  /* コマンド入力（矢印アイコン）以外の標準設定されているパンチやキックのアイコンの設定をリセット */
  content: unset;
  color: unset;
  background-color: unset;
  transform: unset;
}
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Punch: Light （弱パンチ） */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_2 > li:nth-child(11)::after,
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_4 > li:nth-child(11)::after {
  content: "\1F44A";  /* パンチアイコン（ユニコード） */
  background-color: #00ffff;  /* 青色 */
}
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Punch: Med （中パンチ） */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_3 > li:nth-child(13)::after {
  content: "\1F44A";  /* パンチアイコン（ユニコード） */
  background-color: #ffff00;  /* 黄色 */
}
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Punch: Heavy （強パンチ） */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_5 > li:nth-child(15)::after,
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_4 > li:nth-child(15)::after {
  content: "\1F44A";  /* パンチアイコン（ユニコード） */
  background-color: #ff0000;  /* 赤色 */
}
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Kick: Light （弱キック） */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_0 > li:nth-child(21)::after,
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_6 > li:nth-child(21)::after {
  content: "\1F9B6";  /* キックアイコン（ユニコード） */
  background-color: #00ffff;  /* 青色 */
  transform: rotate(60deg);  /* アイコンの傾き */
}
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Kick: Med （中キック） */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_1 > li:nth-child(23)::after {
  content: "\1F9B6";  /* キックアイコン（ユニコード） */
  background-color: #ffff00;  /* 黄色 */
  transform: rotate(60deg);  /* アイコンの傾き */
}
/* [KeyLog: Street Fighter V: KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Kick: Heavy （強キック） */
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_7 > li:nth-child(25)::after,
#GameInputDisplay[data-styles~="KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_Press_6 > li:nth-child(25)::after {
  content: "\1F9B6";  /* キックアイコン（ユニコード） */
  background-color: #ff0000;  /* 赤色 */
  transform: rotate(60deg);  /* アイコンの傾き */
}
~~~

攻撃ボタンのキーコンフィグのみの変更のため、攻撃ボタンの設定のみリセットし、各ボタン番号にアイコン・色などを設定し直しています。  

アイコンを表示するためのブランクのliタグはパラメーター設定「items」の設定分だけあり（「li:nth-child(n)」で個別指定が可能）、1番目（「li:nth-child(1)」以外に弱中強のパンチやキックを割り当てます。  
ここでは次のように割り当てています。  

- li:nth-child(11) = 弱パンチ  
- li:nth-child(13) = 中パンチ  
- li:nth-child(15) = 強パンチ  
- li:nth-child(21) = 弱キック  
- li:nth-child(23) = 中キック  
- li:nth-child(25) = 強キック  

2番以上でパラメーター設定「items」値以内でお好きな番号を割り当てることができ、連番でも大丈夫です（番号でキーログの表示順も管理しています）。  
ただし異なるアクションに対して同じ番号を指定すると設定が上書きされてしまいますし、同一のアクションに対して複数の番号を割り当てると同じアクションが同時に複数表示される場合があります。  

また投げなどのアクションを追加し番号を割り当てることもできます。  

アクション（パンチやキックなど）にボタン番号とアイコン番号が紐付けば、後はCSSの書式に応じてスタイル（アイコンや色など）を指定していくだけです。  

ボタン番号は「Button_n」のように管理されており、ボタン番号が「3」の場合は「Button_3」となります。  
お使いのコントローラーのボタン番号は、デバッグモードで確認することができます。  

カスタマイズしたキーコンフィグは「B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK」を別のスタイル名に書き換えてカスタムCSSとして設定しておけば、必要に応じてstylesパラメーターでキーコンフィグを切り替えることができます。  

**スタイル名は半角英数字のみを推奨**します（全角文字や一部の記号などは不具合の原因になりやすいため）。  
スタイル名はコントローラースキンでも使用しており、スタイル名が被ると他のコントローラースキンやキーコンフィグと干渉する恐れがあるため、**スタイル名が他と被らないように注意**してください。  

### KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VShift_B7HK

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 弱パンチ・弱キック同時押し（投げ）  
- ボタン5 = 強パンチ  
- ボタン6 = 強パンチ・中キック同時押し（Vシフト）  
- ボタン7 = 強キック  

ストリートファイターVでR1ボタンに投げを、R2ボタンにVシフトを設定した場合の標準的なキーコンフィグのプリセットになります。  
一般的なアケコンなどのボタン配置（番号）向けのため、PS4純正パッドなどには向きません。  

### KeyLog_SFV_Lelou_Front6Pad

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 強パンチ  
- ボタン5 = 弱中パンチ同時押し  
- ボタン6 = 強キック  
- ボタン7 = 弱中キック同時押し  
- ボタン10 = 十字キー上入力  

このキーコンフィグは特殊で、本ソフトウェアの開発者がストリートファイターVをプレイする時のキーコンフィグのプリセットになります（6ボタンパッドを使用）。  

「`index.html?excludes=12&directionals=10-13-14-15&styles=Front6Pad,KeyLog_SFV_Lelou_Front6Pad`」のように指定します。  
パラメーター設定例では上入力をパラメーター設定「excludes」で十字キー上を無効化し、パラメーター設定「directionals」で上入力がボタン10（ボタン12から変更）になるように指定しています。  

攻撃ボタンは右手でのみ操作し、EX技の強度（弱中・弱強・中強）の入力にも対応できる配置になっています。  
投げ・Vスキル・Vトリガー・Vシフトは複数のボタンを同時押しして行います。  

また上入力は通常の十字キーの上（ボタン番号「12」）から、L1ボタンの位置（左手人差し指）に移動しています（ボタン番号「10」）。  
これによりパッドでも下入力を維持したまま上入力行えるようになり、HitBoxなどと同じように引きつけサマーソルトキックなどが出しやすくなります。  

ザンギエフのスクリューパイルドライバーのような十字キー1回転コマンドはやりづらいかもしれませんが（ストVには簡易コマンドがあるので出来なくはない）、ガイルに限らず他のキャラクターでもこのキーコンフィグでプレイできるかと思います。  
個人の感想ですが、上入力やりやすくなったのか空投げ対空がやりやすくなりました。  

## ストリートファイター6  

対戦格闘アクションゲーム「ストリートファイター6」のプレイを想定したキーコンフィグに対応しています。  

上下同時入力や左右同時入力はニュートラル（上下もしくは左右の入力はないものとして処理）として表示します。  
またホールド中（長押し）に他の入力で変化があった場合は、ホールド中のものも含めその時点で入力されている方向・ボタンを新たに表示します。  

PS4純正パッド向けに操作タイプの「クラシック」と「モダン」のプリセットのキーログはありますが、ボタン配置をカスタマイズしていたり使用するコントローラーの種類によってはプリセットのキーログが使えない場合があります。
このような場合は、後でご紹介する『[パラメーター「styles」のみでスト6のカスタムキーコンフィグを設定する](#パラメーターstylesのみでスト6のカスタムキーコンフィグを設定する)』を参考にしてください。  

ただしGameInputDisplayとストリートファイター6とではコントローラーの入力受付処理が異なるため、実際の入力内容とキーログの表示が異なる場合があります。  
またGameInputDisplayが動作する端末に接続されているコントローラーの入力情報を元に動作するため、コンソール機や2PC環境（ゲームをプレイするPCと配信ソフトが動作するPCが分かれている）では基本的に動作しません。  

なおカスタムCSSを作成するなど上級者向けの情報になりますが、パラメーター「styles」に「KeyLog_SF6」の文字列が含まれているとストリートファイター6向けのキーログになります。  
ストリートファイター6向けのキーコンフィグは特殊なため、従来のキーログと「KeyLog_SF6」の文字列を含むキーログを併用する場合は、正しく表示されない恐れがあります。  

### KeyLog_SF6_ProPad  

PS4純正パッドで操作タイプが「クラシック」の場合のプリセットで、「`index.html?styles=ProPad,KeyLog_SF6_ProPad`」のように指定します。  

- ボタン0（×） = 弱キック  
- ボタン1（○） = 中キック  
- ボタン2（□） = 弱パンチ  
- ボタン3（△） = 中パンチ  
- ボタン4（L1） = 強パンチ・強キック同時押し  
- ボタン5（R1） = 強パンチ  
- ボタン6（L2） = 中パンチ・中キック同時押し  
- ボタン7（R2） = 強キック  

### KeyLog_SF6_Modern_ProPad  

PS4純正パッドで操作タイプが「モダン」の場合のプリセットで、「`index.html?styles=ProPad,KeyLog_SF6_Modern_ProPad`」のように指定します。  

- ボタン0（×） = 中攻撃  
- ボタン1（○） = 強攻撃  
- ボタン2（□） = 弱攻撃  
- ボタン3（△） = 必殺技  
- ボタン4（L1） = ドライブインパクト  
- ボタン5（R1） = ドライブパリィ  
- ボタン6（L2） = 投げ  
- ボタン7（R2） = アシストボタン  

### パラメーター「styles」のみでスト6のカスタムキーコンフィグを設定する  

パラメーター設定「styles」のみ（カスタムCSS不要）でカスタムキーコンフィグの設定が可能です。  
ほとんどのゲームコントローラーで設定可能だと思いますが、一部例外があるかもしれません。  

ボタン番号毎に弱中強のパンチ・キックやモダン用ボタンを指定したスタイル名を半角カンマ（「,」）で繋げてstylesパラメーターに設定する感じになります。  
使用するゲームコントローラーの**ボタン番号はデバッグモード（`index.html?modes=Debug`）で調べることができます**。  

プリセットとして弱中強のアクションなどのそれぞれに**ボタン番号0～19までスタイル名を用意しています**。 
スタイル名は「KeyLog_SF6_KC_アクション_ボタン番号」の書式で、次のようになっています（末尾の「X」を割り当てるボタン番号に置き換えてください）。  

- 弱パンチ = KeyLog_SF6_KC_PL_X  
- 中パンチ = KeyLog_SF6_KC_PM_X  
- 強パンチ = KeyLog_SF6_KC_PH_X  
- 弱キック = KeyLog_SF6_KC_KL_X  
- 中キック = KeyLog_SF6_KC_KM_X  
- 強キック = KeyLog_SF6_KC_KH_X  
- （モダン）弱攻撃 = KeyLog_SF6_KC_LA_X  
- （モダン）中攻撃 = KeyLog_SF6_KC_MA_X  
- （モダン）強攻撃 = KeyLog_SF6_KC_HA_X  
- （モダン）必殺技 = KeyLog_SF6_KC_SP_X  
- （モダン）ドライブパリィ = KeyLog_SF6_KC_DP_X  
- （モダン）アシスト = KeyLog_SF6_KC_AS_X  
- （モダン）ドライブインパクト = KeyLog_SF6_KC_DI_X  

例えば次のようにカスタムキーコンフィグを設定するとします。

- ボタン0 = KeyLog_SF6_KC_KL_0 = 弱キック  
- ボタン1 = KeyLog_SF6_KC_KM_1 = 中キック  
- ボタン2 = KeyLog_SF6_KC_PL_2 = 弱パンチ  
- ボタン3 = KeyLog_SF6_KC_PM_3 = 中パンチ  
- ボタン4 = KeyLog_SF6_KC_PL_4,KeyLog_SF6_KC_KL_4 = 弱パンチ・弱キック同時押し（投げ）  
- ボタン5 = KeyLog_SF6_KC_PH_5 = 強パンチ  
- ボタン6 = KeyLog_SF6_KC_PH_6,KeyLog_SF6_KC_KH_6 = 強パンチ・強キック同時押し（ドライブインパクト）  
- ボタン7 = KeyLog_SF6_KC_KH_7 = 強キック  

この場合のキーコンフィグ用スタイル名は「`KeyLog_SF6_KC_KL_0,KeyLog_SF6_KC_KM_1,KeyLog_SF6_KC_PL_2,KeyLog_SF6_KC_PM_3,KeyLog_SF6_KC_PL_4,KeyLog_SF6_KC_KL_4,KeyLog_SF6_KC_PH_5,KeyLog_SF6_KC_PH_6,KeyLog_SF6_KC_KH_6,KeyLog_SF6_KC_KH_7`」になります。  

パラメーター設定「styles」を指定する際は同時にコントローラースキンの指定が必要になりますので、「`index.html?styles=DualBox,KeyLog_SF6_KC_KL_0,KeyLog_SF6_KC_KM_1,KeyLog_SF6_KC_PL_2,KeyLog_SF6_KC_PM_3,KeyLog_SF6_KC_PL_4,KeyLog_SF6_KC_KL_4,KeyLog_SF6_KC_PH_5,KeyLog_SF6_KC_PH_6,KeyLog_SF6_KC_KH_6,KeyLog_SF6_KC_KH_7`」のように指定します。  

なおコントローラーが同じボタン配置（ボタン番号）でカスタムキーコンフィグが同じであれば、このパラメーター「styles」は他のプレイヤーでもそのまま流用できることがあります。  
困っている人がいればお互いに助け合っていただければと思います。  

# オリジナルのコントローラースキンの作り方  

プリセットのコントローラースキンはベースとなる「Base.png」の上に、差分の「Button_XX.png」や「StickYY_XX.png」の画像を表示する構造になっており、ベース画像と差分画像を置き換えるだけでオリジナルのコントローラースキンを自作できます。  
カスタムCSSでもオリジナルスキンの作成はできますが、CSSなどの知識も多少必要になります。  

ベース画像と差分画像の画像寸法が同じであれば、元のスキンと画像寸法が変わっても、自動的にサイズ調整して表示されます。  
**ベース画像と差分画像の寸法が異なるとカスタムCSSなどで表示位置の調整が必要になる**場合があります。  

作ろうと思うオリジナルのコントローラースキンと十字キーボタン・左スティック・右スティックの数が近いプリセットのコントローラースキンの画像を差し替えるのが簡単です。  

PS4純正パッドやプロコンなどのように十字キーボタンも左スティックも右スティックもそれぞれ独立しているなら、「ProPad」スキンが最適だと思います。  
アケコンなど十字キー入力がスティックのみの場合は「ArcadeController」スキンが最適だと思います。  

なお、スキンフォルダ内の「Active.png」は差分画像ファイルを作成する時に使用した作業ファイルで、参考のために残しています。  
実際のスキンの表示には使用していないため削除しても大丈夫です。  

## ProPad  

PS4純正パッド（DualShock4）仕様の「ProPad」スキンがプリセットの中で最もボタンが多く、十字キーボタン以外に左スティックと右スティックが独立しています。  
L2ボタンとR2ボタンはトリガータイプとして入力強度・押込み度合いに対応しています（不透明度で表現）。  

「`skins/ProPad`」フォルダにあり、次の画像で構成されています。  

-- Base.png  
-- Button_0.png  
-- Button_1.png  
-- Button_2.png  
-- Button_3.png  
-- Button_4.png  
-- Button_5.png  
-- Button_6.png  
-- Button_7.png  
-- Button_8.png  
-- Button_9.png  
-- Button_10.png  
-- Button_11.png  
-- Button_12.png  
-- Button_13.png  
-- Button_14.png  
-- Button_15.png  
-- Button_16.png  
-- Button_17.png  
-- StickL_1.png  
-- StickL_2.png  
-- StickL_3.png  
-- StickL_4.png  
-- StickL_6.png  
-- StickL_7.png  
-- StickL_8.png  
-- StickL_9.png  
-- StickR_1.png  
-- StickR_2.png  
-- StickR_3.png  
-- StickR_4.png  
-- StickR_6.png  
-- StickR_7.png  
-- StickR_8.png  
-- StickR_9.png  
-- Controller_0.png  
-- Controller_1.png  
-- Controller_2.png  
-- Controller_3.png  

ベース画像「Base.png」は常時表示され、入力がない状態の画像になります。  
他は差分ファイルとなっており、入力状態などによって表示されます。  

「Controller_{パラメーター設定『controller』の値}.png」はコントローラーIndexの識別用差分画像で、Nintendo Switch向けコントローラー等で見られることが多いかと思います。  

「Button_{ボタン番号}.png」は対応する番号のボタンが押された時に表示する差分画像です。  

「StickL_{方向のテンキー表記番号}.png」は左スティックの差分画像で、「StickR_{方向のテンキー表記番号}.png」は右スティックの差分画像です。  
テンキー表記番号とはキーボードの数字1～9のテンキー入力の並びを十字方向で表現したもので、未入力（ニュートラル）を「5」とし、上下左右斜めを残りの1～9で表します。  
上は「8」で下が「2」、左が「4」、右が「6」となり、左下が「1」、右下が「3」、左上が「7」、右上が「9」となります。  

表示しない画像はそれらの画像ファイルを削除するか、何も表示しない透過だけの画像ファイルに変更します。  

# Deckモード（応用編）

## GameInputDisplay（Deckモード）からHTMLファイル（iframe）に送信されるメッセージ  

DeckモードでHTMLファイルを表示すると、その後のゲームコントローラーの操作によって入力情報や状態を送信します。  

```
postMessage({
  action: 'GameInputDisplay',  // {string} 値固定
  message: {
    axes: { // 
      commands: ['Up','Down','Left','Right'],  // {string[]} 十字キーボタン: 'Up', 'Down', 'Left', 'Right' ハード・設定によっては全方向入力がありえる）
      leftAxis: ['Up', 'Left'],  // {string[]} 左スティック: 'Up', 'Down', 'Left', 'Right' 1方向もくしは2方向の値
      rightAxis: ['Down', 'Right']  // {string[]} 右スティック: 'Up', 'Down', 'Left', 'Right' 1方向もくしは2方向の値
    },
    state: 'Play',  // {string} iframeの状態： 'Play' = 表示中, 'Pause' = 表示中（のまま）, 'Clear' = 非表示
    type: 'HTML',  // {string} Deckアイテムの種類: 'HTML' or 'Others'
    url: window.location.href,  // {string} GameInputDisplay（親フレーム）の「window.location.href」値
    volume: 0.5  // {number} マスター音量: 0～1
  }
}, "*");
```

# ボタン番号資料

## DualShock4（PlayStation4純正パッド）

- ボタン0 = ×
- ボタン1 = 〇
- ボタン2 = □
- ボタン3 = △
- ボタン4 = L1
- ボタン5 = R1
- ボタン6 = L2
- ボタン7 = R2
- ボタン8 = SHARE
- ボタン9 = OPTIONS
- ボタン10 = L3（左スティック押込）
- ボタン11 = R3（左スティック押込）
- ボタン12 = 上（十字ボタン）
- ボタン13 = 下（十字ボタン）
- ボタン14 = 左（十字ボタン）
- ボタン15 = 右（十字ボタン）
- ボタン16 = PSボタン
- ボタン17 = タッチパッド／タッチパッドボタン

日本国内向けのDualShockの情報のため、グローバル仕様とは異なる可能性があります（伝統的に×ボタンと〇ボタンの扱いが海外と日本では異なることがあるため）。

# 技術情報

## HTMLの構造

```
<body>
  <div id="GameInputDisplay" data-version="${version}" data-controller="${controller}" data-log="${log}" data-ecludes="${ecludes}" data-modes="${modes}" data-styles="${styles}">
        <!-- version: "xx.xx.xx" -->
        <!-- controller: GetParameter.controller -->
        <!-- log: GetParameter.log -->
        <!-- excludes: GetParameter.excludes -->
        <!-- modes: GetParameter.models.split(",").join(" ") -->
        <!-- styles: GetParameter.styles.split(",").join(" ") -->
    <ul id="GIDGameController" class="${classNames}">
      <li></li>  <!-- x100 -->
    </ul>
    <div id="GIDKeyLog">
      <ul class="${classNames}">  <!-- x${GetParameter.log} -->
        <li></li>  <!-- x${GetParameter.items} -->
      </ul>
    </div>
    <ul id="GIDDebug">
      <li class="settings">
        <dl>
          <dt class="controllerIndex">Controller Index</dt>
          <dd class="controllerIndex">${controller}</dd>  <!-- controller: GetParameter.controller -->
          <dt class="inputDelay">Input Delay</dt>
          <dd class="inputDelay">${delay}</dd>  <!-- delay: GetParameter.delay -->
          <dt class="logLimit">Log Limit</dt>
          <dd class="logLimit">${log}</dd>  <!-- log: GetParameter.log -->
          <dt class="modes">Modes</dt>
          <dd class="modes">${modes}</dd>  <!-- modes: GetParameter.modes.split(",").join(" ") -->
          <dt class="styles">Styles</dt>
          <dd class="styles">${styles}</dd>  <!-- styles: GetParameter.styles.split(",").join(" ") -->
          <dt class="directionals">Directional button indexes</dt>
          <dd class="directionals">
            <dl>
              <dt>Up</dt>
              <dd>${directionals.up}</dd>  <!-- directionals.up: GetParameter.directionals.split("-")[0].split(",").join(",") -->
              <dt>Down</dt>
              <dd>${directionals.down}</dd>  <!-- directionals.down: GetParameter.directionals.split("-")[1].split(",").join(",") -->
              <dt>Left</dt>
              <dd>${directionals.left}</dd>  <!-- directionals.left: GetParameter.directionals.split("-")[2].split(",").join(",") -->
              <dt>Right</dt>
              <dd>${directionals.right}</dd>  <!-- directionals.right: GetParameter.directionals.split("-")[3].split(",").join(",") -->
            </dl>
          </dd>
          <dt class="excludeButtons">Exclude Buttons</dt>
          <dd class="excludeButtons">${ecludes}</dd>  <!-- excludes: GetParameter.excludes -->
          <dt class="converts">Button Index Converts</dt>
          <dd class="converts">${converts}</dd>  <!-- converts: GetParameter.converts -->
          <dt class="items">Key log items</dt>
          <dd class="items">${items}</dd>  <!-- items: GetParameter.items -->
        </dl>
      </li>
      <li class="controllers">
        <dl>  <!-- x4 -->
          <dt class="id">ID</dt>
          <dd class="id">${gamepadApi.id}</dd>
          <dt class="index">Index</dt>
          <dd class="index">${gamepadApi.index}</dd>
          <dt class="connected">Connected</dt>
          <dd class="connected">${gamepadApi.connected}</dd>
          <dt class="mapping">Mapping</dt>
          <dd class="mapping">${gamepadApi.mapping}</dd>
          <dt class="timestamp">Timestamp</dt>
          <dd class="timestamp">${gamepadApi.timestamp}</dd>
          <dt class="axes">Axes</dt>
          <dd class="axes">
            <ol start="0">
              <li></li>  <!-- <li></li> * (${gamepadApi.axes.length}) -->
            </ol>
          </dd>
          <dt class="buttons">Buttons</dt>
          <dd class="buttons">
            <ol start="0">
              <li></li>  <!-- <li></li> * (${gamepadApi.buttons.length}) -->
            </ol>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</body>
```

# Author
[神戸ルル（Code Lelou）](https://twitter.com/codelelou)
