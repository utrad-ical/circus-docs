---
title: Welcome to CIRCUS Docs
sidebar_label: Welcome
slug: /
---

:::note

This site is still in progress. We welcome your pull requests on our [documentation repository](https://github.com/utrad-ical/circus-docs).

:::

CT・MRIをはじめとする医用画像診断装置の進歩に伴い、診断に使用される画像は飛躍的に増加しており、一日あたりの検査件数も増加しています。そのため、医師は膨大な画像を観察する必要が生じており、大きな負担となっています。また、負担の大きい作業を長時間続けることで、見落としなどを招くことにもなります。以上の背景から、診断の効率・精度の向上をもたらすコンピュータ支援診断／検出(computer-assisted diagnosis/detection, CAD)ソフトウェアの開発が期待されています。

CADソフトウェアの開発／臨床応用を促進するためには、アルゴリズムの開発、ソフトウェアの実装、臨床使用、知見のフィードバック、アルゴリズムおよびソフトウェアの改善、さらなる臨床使用の循環が必要です。**CIRCUS** (Clinical Infrastructure for Radiologic Computation of United Solutions) は、これらの循環を実現することを目的に開発された、統合的なCAD開発プラットフォームであり、完全にウェブベースで開発されています。

CIRCUSはMITライセンスで公開されるオープンソースプロジェクトです。


## CIRCUSの構成

CIRCUSは2種類のトップレベル・アプリケーションで構成されています

### CIRCUS DB (database)

CADソフトウェアの開発では、対象となる疾患の元画像および診断結果を含む症例情報をデータベースに蓄積します。しかし、症例情報の入力、特に病変形状のペイント入力作業は非常に時間を要するため、入力作業の効率化が望まれます。CIRCUS DBはWebベースの病変形状ペイント入力インターフェイスを含む画像データベースシステム(CIRCUS DB)です。

#### CIRCUS DBの特徴

- 複数疾患ならびに複数DICOMシリーズに対応
- 症例情報の入力項目は対象とする疾患毎に設定可能
- ソフトウェア開発用の元画像および病変形状はボリュームデータとして取得可能（症例情報はJSONファイルにて取得）

### CIRCUS CS (clinical server)

開発したCADソフトウェアを臨床現場で使用するためには、画像診断装置から画像を転送した直後に処理が実行可能でかつ、処理結果に対する評価も容易に行える環境が必要になります。CIRCUS CSはCADソフトウェアの臨床使用および評価を容易にするプラットフォームです。

#### CIRCUS CSの特徴
 
- Webブラウザ上で画像解析アプリケーションの実行・結果表示が可能
- 病変検出、可視化、自動計測などの各種画像解析アプリケーションはDocker imageベースのプラグインとして随時追加／削除可能
- ユーザが診断結果に基づく評価を入力することでソフトウェア改善のみならずユーザの診断傾向分析のための情報収集が同時に実現


## ライセンス

CIRCUSは、MIT Licenseの元に配布されるフリーソフトウェアです。

CIRCUS CS上で動作するオリジナルのプラグインを作成した場合、プラグインの作者は別のライセンス（商用ライセンスを含む）を適用することができます。

CIRCUSは他のオープンソフトウェアを使用して構築されています。CIRCUSと別のライセンスが適用されます。主なものを以下に掲載します。

### Node.js

Node.js は OpenJS Foundation により MIT license で配布されている JavaScript実行環境です。

### nginx

nginx は Nginx, Inc. により 2-clause BSD-like license で配布されている HTTPサーバソフトウェアです。

### MongoDB

MongoDB は MongoDB, Inc. により Server Side Public License (SSPL) で配布されているドキュメント指向データベースです。

### Docker

Docker は  Docker, Inc. により Apache License 2.0 で配布されているコンテナ型の仮想化プラットフォームです。


## 文献

CIRCUSの概要は以下の論文に掲載されています。CIRCUSを用いた研究成果を発表する場合には、CIRCUSを利用した旨明記し、かつ以下の文献の引用をお願いいたします。

Nomura Y, Miki S, Hayashi N, Hanaoka S, Sato I, Yoshikawa T, Masutani Y, Abe O<br />
**Novel platform for development, training, and validation of computer-assisted detection/diagnosis software**<br />
International Journal of Computer Assisted Radiology and Surgery, vol.15, no.4, 661-672, 2020

- [**Journal's site** (open access)](https://rdcu.be/b2OLL)

## About The Documents

This docs site is divided into three sections.

- **[User Guide](users/login)**: Explains how to use CIRCUS CS/DB as an end user.
- **[Admininistrator Guide](admin/installation)**: Explains how to install CIRCUS in your institute, etc.
- **[Developer Guide](dev/api-intro)**: Explains how to programmatically access data on CIRCUS. Also explains how to build a new application using CIRCUS RS, our DICOM viewer component (requires JavaScript knowledge).
