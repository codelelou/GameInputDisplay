# 機能

本ソフトウェアは配信ソフトOBSにゲームコントローラーの入力を表示するために開発しました。  

ゲームコントローラーでどのボタンを押しているかをグラフィック表示したり、キーログ（キーディスプレイ）表示ができるようになります。  

入力情報の取得はGamepad API（Web API）を使用しているため、**XInput未対応のゲームコントローラーやキーボードなどには対応しておりません**。  

# 使い方

配信ソフトOBSのソースに、本ソフトウェア（index.html）を「ブラウザ」として設定することで使用できるようになります。  

その際はブラウザソースのプロパティの「URL」に「`http://absolute/C:/GameInputDisplay/index.html`」のように設定してください（ローカルファイルパスの頭に「`http://absolute/`」をつける）。  
**「ローカルファイル」として設定するとパラメーター設定ができなくなるので注意**してください。  

ダウンロードせずに「`https://codelelou.github.io/GameInputDisplay/index.html`」と設定することでも動作はしますが、オフライン環境やサーバーが落ちている時などは使用できませんし、処理に遅延が発生する場合があります。  

## サイズ・表示位置などの調整

配信ソフトOBSを使用する場合の解説になりますが、他の配信ソフトでも似たような機能や項目があると思いますので参考にしてください。  

この方法であればカスタムCSSを設定することなく、他のソースと同じような感覚で配信ソフトのシーン・ソース管理機能でサイズや表示位置、不透明度の設定ができます。  

まずは本ソフトウェア専用シーンとして、新規「シーン」を追加します。  
このシーンのソースにはブラウザソースとして本ソフトウェアを追加します。  

URLは「`http://absolute/C:/GameInputDisplay/index.html`」のように設定（ご自身の環境に合わせて「`http://absolute/`」以降を変更してください）し、幅と高さは配信画面と同じにしてください。  
本ソフトウェアを表示しない時に無駄なプログラムは走らないように「表示されてないときにソースをシャットダウン」の項目も有効にします（チェックを入れる）。  

次にゲームコントローラー用とキーログ用として2つのシーンを作成します。  
これらのシーンのソースには、シーンソースとして先程追加した本ソフトウェア専用シーンを追加します（シーンを分けることで個別に不透明度の設定などができるようになります）。  

ゲームコントローラー用シーンにはゲームコントローラーのみが、キーログ用シーンにはキーログのみが表示されるようにクロップ（切り取り）します。  
拡大縮小するような感じで**サイズ調整をaltキーを押しっぱなしですることでクロップの調整ができます**。  
**キーログはゲームコントローラーの入力がないと表示されない**ので、パソコンに使用するコントローラーを接続し、いくつか入力を行ってキーログを表示してください（ゲームの起動は不要です）。  

サイズ調整をリセットしたい場合は、リセットしたいソースを右クリックし「変換」メニューの「変換をリセット」を実行してください（そのソースがロック状態の場合はロックを解除してください）。  

あとは他のソースと同じように、お好みのシーンのソースにゲームコントローラー用シーンやキーログ用シーンをシーンソースとして追加し、サイズや表示位置の調整をするだけです。  
そのシーンソースのフィルタに「カラーキー」を追加することで、「不透明度」の調整もできます。  

コントローラースキンのカスタマイズなどは最初に作成したシーンのブラウザソースの「カスタムCSS」で設定してください。  
複数のコントローラースキンをカスタムCSSに別スタイル名で設定しておけば、そのブラウザソースのURLのstylesパラメーターを変更することでスキンを切替えれます。  

シーンソースの切替えでスキンを切り替えたい場合は、スキン別にシーンを作成し、それぞれにブラウザソースとして本ソフトウェアを設定し、さらにそれらのシーンを元にスキン毎にゲームコントローラー用とキーログ用のシーンを作る必要があります。  
ゲームによってコントローラーが違うなど頻繁にスキンを切替える場合は、スキン別にシーンを作成する方法が向いているかもしれません。  

# パラメーター設定

本ソフトウェアの各種設定は、「`index.html?delay=4&log=20&excludes=8,9,11&style=DualPad`」のようにパラメーターから指定できます。  
**スペースや全角などが含まれているような場合は、正常に本ソフトウェアが動作しない場合があります**。  

## modes

既定値：Controller,KeyLog  

コントローラーかキーログのどちらか一方のみを表示したい場合は「`index.html?modes=Controller`」のように指定します。  

デバッグモード（「`index.html?modes=Debug`」）が有効の場合は、コントローラーもキーログも両方表示されます。  
デバッグモードでは本ソフトウェアのバージョンと各パラメーター設定内容の確認と、パソコンに繋いでいるコントローラーの情報（接続Indexやボタン番号など）を確認できます。  

### modes値

- Controller
- KeyLog
- Debug

## controller

既定値：0  

複数のコントローラーを繋いでいる場合は、入力を表示したいコントローラーのIndexを指定してください。  
最大4台までのコントローラーを認識できます（0～3）。  

デバッグモードで接続中のゲームコントローラーのIndexを確認することができます。 

## delay

既定値：8

本ソフトウェアは一定間隔でゲームコントローラーの情報を取得しており、その**最短**の間隔をミリ秒で指定することができます。  

そのため**再取得するまでの空白の時間の入力情報は取得できません**し、複数同時押しの場合でもタイミングによっては同時入力として表示されない場合があります。  
ただしこれはあくまで本ソフトウェアでの表示であり、プレイ中のゲーム内の処理とは関係ありません。  

**間隔が短すぎるとパソコンに過度の負荷が掛かったり、ブラウザの制約などにより指定した間隔で動作しない**場合があります。  
4ミリ秒未満を指定した場合は、ブラウザの内部処理で4ミリ秒間隔として処理が行われるようです。  

Windowsであればタスクマネージャーの「プロセス」から配信ソフトのCPU使用率などをチェックできます（ゲーム未起動・未配信状態で、本ソフトウェアの専用ソースのみ表示してチェックする方が負荷の切り分けがしやすいかと思います）。  
ゲームコントローラー入力中の方が多くの処理が行われるため、ボタン等を色々押しながらチェックしてください。  

## log

既定値：30

キーログの**最大**表示件数を指定します。  
1～100の整数に対応しています。  

入力内容によってはキーログのCSS（キーコンフィグ）により非表示になるログもあるため、指定件数より実際に表示されるのは少ない可能性があります。  

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

## styles

既定値：DualPad,KeyLog_ButtonSymbol_PS_DualShock  

PlayStation4純正パッド（DualShock4）での標準的な使用ケースの割合の多さを想定し、stylesを指定することなく使用できるように規定値を変更しました。  
バージョン「01.03.00」未満の既定値は「Front6Pad」でした。  

コントローラースキンやキーログ用キーコンフィグプリセットの指定ができます。  

キーコンフィグプリセットを指定する際は、「`index.html?styles=Front6Pad,B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VShift_B7HK`」のように半角カンマ区切りでコントローラースキンも指定してください。  
**コントローラースキンが未設定状態の場合はコントローラーが表示されない**場合があります。  

### コントローラースキン

- DualPad（既定・DualShock4/DualSense風）
- Front6Pad（6ボタンゲームパッド風）
- ArcadeController（アーケードコントローラー風）
- ButtonBox（HitBox・レバーレスコントローラー風）
- DualBox（HitBox Cross|Up風）

標準でこれらのコントローラースキンを指定できます。  

# キーログ（キーディスプレイ）

キーコンフィグはCSSで設定可能です。  
配信ソフトOBSの場合はBrowserソースのプロパティの「カスタムCSS」に設定します。

標準でいくつかキーコンフィグプリセットを用意しており、「`index.html?styles=Front6Pad,KeyLog_SFV`」のようにパラメーターで指定することができます。  
**「styles」パラメーターを指定する時は、コントローラースキンの指定を忘れない**ようにしてください（キーログのみ指定するとコントローラーが表示されない場合があります）。  

標準で用意しているキーコンフィグのプリセットは次の通りです（独自のキーコンフィグの設定する際の参考にもなるかと思います）。

## コマンド表示（十字キー・方向キー・左スティック）

左右両方の入力がある場合は、左右両矢印を表示します。  
左右両方入力に加え上下の入力が一方でもある場合は、左右の入力は無視し、上矢印か下矢印を表示します。  
上下のがどちらも入力されている場合は、上矢印を表示します。  

## KeyLog_ButtonSymbol_PS_DualShock

パラメーター設定「styles」で既定のキーコンフィグで、PlayStation4純正パッド（DualShock4）のボタン表記に合わせています。  

- ボタン0 = ×
- ボタン1 = 〇
- ボタン2 = □
- ボタン3 = △
- ボタン4 = L1
- ボタン5 = R1
- ボタン6 = L2
- ボタン7 = R3
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
PS4純正パッドを使用する場合は「`KeyLog_SFV_DualPad`」が向いていると思われます。  

### KeyLog_SFV_DualPad

「ストリートファイターV」向けのキーコンフィグをPS4純正パッド向けにカスタマイズしたものです。  
「`index.html?styles=DualPad,KeyLog_SFV_DualPad`」のように指定します。

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 強パンチ  
- ボタン5 = 強キック  
- ボタン6 = 弱中強パンチ同時押し  
- ボタン7 = 弱中強キック同時押し  

### KeyLog_SFV_B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK

- ボタン0 = 弱キック  
- ボタン1 = 中キック  
- ボタン2 = 弱パンチ  
- ボタン3 = 中パンチ  
- ボタン4 = 弱パンチ・弱キック同時押し（投げ）  
- ボタン5 = 強パンチ  
- ボタン6 = 強パンチ・強キック同時押し（Vトリガー）  
- ボタン7 = 強キック  

ストリートファイターVでR1ボタンに投げを、R2ボタンにVトリガーを設定した場合の標準的なキーコンフィグになります。  
一般的なアケコンなどのボタン配置（番号）向けのため、PS4純正パッドなどには向きません。  

#### CSS（キーコンフィグ）の解説

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

アイコンを表示するためのブランクのliタグは100個あり（「li:nth-child(n)」で個別指定が可能）、1番目（「li:nth-child(1)」以外に弱中強のパンチやキックを割り当てます。  
ここでは次のように割り当てています。  

- li:nth-child(11) = 弱パンチ  
- li:nth-child(13) = 中パンチ  
- li:nth-child(15) = 強パンチ  
- li:nth-child(21) = 弱キック  
- li:nth-child(23) = 中キック  
- li:nth-child(25) = 強キック  

2～100番であればお好きな番号を割り当てることができ、連番でも大丈夫です（番号でキーログの表示順も管理しています）。  
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

ストリートファイターVでR1ボタンに投げを、R2ボタンにVシフトを設定した場合の標準的なキーコンフィグになります。  
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

このキーコンフィグは特殊で、本ソフトウェアの開発者がストリートファイターVをプレイする時のキーコンフィグになります（6ボタンパッドを使用）。  

「`index.html?excludes=12&directionals=10-13-14-15&styles=Front6Pad,KeyLog_SFV_Lelou_Front6Pad`」のように指定します。  
パラメーター設定例では上入力をパラメーター設定「excludes」で十字キー上を無効化し、パラメーター設定「directionals」で上入力がボタン10（ボタン12から変更）になるように指定しています。  

攻撃ボタンは右手でのみ操作し、EX技の強度（弱中・弱強・中強）の入力にも対応できる配置になっています。  
投げ・Vスキル・Vトリガー・Vシフトは複数のボタンを同時押しして行います。  

また上入力は通常の十字キーの上（ボタン番号「12」）から、L1ボタンの位置（左手人差し指）に移動しています（ボタン番号「10」）。  
これによりパッドでも下入力を維持したまま上入力行えるようになり、HitBoxなどと同じように引きつけサマーソルトキックなどが出しやすくなります。  

ザンギエフのスクリューパイルドライバーのような十字キー1回転コマンドはやりづらいかもしれませんが（ストVには簡易コマンドがあるので出来なくはない）、ガイルに限らず他のキャラクターでもこのキーコンフィグでプレイできるかと思います。  
個人の感想ですが、上入力やりやすくなったのか空投げ対空がやりやすくなりました。  

# オリジナルのコントローラースキンの作り方

本ソフトウェアをダウンロードしてご利用の場合は、スキンの画像ファイルを直接編集することでオリジナルスキンを自作することが可能です。  

画像の寸法は同一スキンで使用する画像がすべて同じであれば、変更可能です（自動的にサイズ調整して表示されます）。  
**寸法が異なる画像があるとCSSなどで表示位置の調整が必要になる**場合があります。

スキンはベースとなる「Base.png」と押したボタンの差分画像の組み合わせで構成しています。  
なお、スキンフォルダ内の「Active.png」は差分画像ファイルを作成する時に使用したもので、スキンの表示には使用していないため削除しても大丈夫です。  

# ボタン番号資料

## DualShock4（PlayStation4純正パッド）

- ボタン0 = ×
- ボタン1 = 〇
- ボタン2 = □
- ボタン3 = △
- ボタン4 = L1
- ボタン5 = R1
- ボタン6 = L2
- ボタン7 = R3
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

~~~
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
      <ul class="${classNames}"><li></li></ul>  <!-- x100 -->
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
~~~

# Author
[神戸ルル（Code Lelou）](https://twitter.com/codelelou)
