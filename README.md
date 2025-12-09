# MyFinances

O MyFinances é um aplicativo mobile de controle financeiro desenvolvido em React Native. Ele permite gerenciar receitas e despesas, visualizar relatórios gráficos e gerar PDFs, integrando autenticação e banco de dados via Firebase.


<div>
  <img src="https://github.com/user-attachments/assets/2d0e545c-81eb-4309-9113-182a6b248262" width="300" alt="Demonstração do App" />

  </div>
<br/>

* O fluxo básico de navegação e funcionalidades do app pode ser visualizado abaixo:

[![](https://mermaid.ink/img/pako:eNqNVN1O2zAUfhXLCAmkwhrSnyUXm6r-bJMAIcFulqLJTZzGwrEj24FC24s9CtoFV1zuCfJiO45DW20wLReWz_H5vvOfJY5lQnGIUy7v4owog65GU4HguzQgHRx8EdVzzCQaFMXhITo6-oCGGY1vBqXJll91WT0qeDyVc5LIj2uHdOf-PprwciFRQhFYU2FYTKqn6qd07xsaS7o6B_3K8jARXVFOLKqW0Ds0JAnRRslrB3RqC5owRWdE1_zZasv4RxjVD0WJi5G85vuS5St0RWY6Oie3dO6CRDRHAyC_3iXT5WyuSJHZanyfQMlQ5HK8UEzErCC8MbefZaz5gQZ5K_RZ5tTlNmGCiOppQ_6X9ckKGGXKOI3OaIkuqIL7jvH2ZqtcgmspCGcJSahGCaldbW2s1NSLG0UUVIpwKhKiokvKaQ1WaEQMuX4FdC5vJZIlGifMWOxEqjyyR8ld86FTLwm9hh_YyHTt1c6X3rT3k6oeUxZL_VZiA2jEL0horAsaV89gS_TWwIbg2kf4bR0YTIM2UtHoYMhlmWwVhzseXBA1cCjzAgTGMwu_GE2i8aKQCrK0wltRwRzJ0mxVTaOaUJhqptgZQJWnYjOIYw3O2EMzYJrlBYf0IAaCbHIKzaRgptkPbe453eYAFpyHe2mQtuwu3NBwz_f95n50xxKThSfFYhdbb3CDm83-H-cWrPGXBv_E4RaeK5bg0KiStnBOVU6siJeWcYpNRmEUcQhXmLebKZ6KNWAKIr5Jmb_AlCznGQ5TwjVIZZEQQ0eMwK7lG62CWlI1lKUwOOx4QU2CwyVe4NDzvGO_1w46vaDre-1-z2vhe1B3j0-8oNP1wTzw--1eZ93CD7Xf9vH7jg-PvaDf6Xc7NjVMYcKlOnM_xFiKlM3x-jcC9amq?type=png)](https://mermaid.live/edit#pako:eNqNVN1O2zAUfhXLCAmkwhrSnyUXm6r-bJMAIcFulqLJTZzGwrEj24FC24s9CtoFV1zuCfJiO45DW20wLReWz_H5vvOfJY5lQnGIUy7v4owog65GU4HguzQgHRx8EdVzzCQaFMXhITo6-oCGGY1vBqXJll91WT0qeDyVc5LIj2uHdOf-PprwciFRQhFYU2FYTKqn6qd07xsaS7o6B_3K8jARXVFOLKqW0Ds0JAnRRslrB3RqC5owRWdE1_zZasv4RxjVD0WJi5G85vuS5St0RWY6Oie3dO6CRDRHAyC_3iXT5WyuSJHZanyfQMlQ5HK8UEzErCC8MbefZaz5gQZ5K_RZ5tTlNmGCiOppQ_6X9ckKGGXKOI3OaIkuqIL7jvH2ZqtcgmspCGcJSahGCaldbW2s1NSLG0UUVIpwKhKiokvKaQ1WaEQMuX4FdC5vJZIlGifMWOxEqjyyR8ld86FTLwm9hh_YyHTt1c6X3rT3k6oeUxZL_VZiA2jEL0horAsaV89gS_TWwIbg2kf4bR0YTIM2UtHoYMhlmWwVhzseXBA1cCjzAgTGMwu_GE2i8aKQCrK0wltRwRzJ0mxVTaOaUJhqptgZQJWnYjOIYw3O2EMzYJrlBYf0IAaCbHIKzaRgptkPbe453eYAFpyHe2mQtuwu3NBwz_f95n50xxKThSfFYhdbb3CDm83-H-cWrPGXBv_E4RaeK5bg0KiStnBOVU6siJeWcYpNRmEUcQhXmLebKZ6KNWAKIr5Jmb_AlCznGQ5TwjVIZZEQQ0eMwK7lG62CWlI1lKUwOOx4QU2CwyVe4NDzvGO_1w46vaDre-1-z2vhe1B3j0-8oNP1wTzw--1eZ93CD7Xf9vH7jg-PvaDf6Xc7NjVMYcKlOnM_xFiKlM3x-jcC9amq)

### Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando tecnologias modernas para garantir performance e escalabilidade. Abaixo estão as principais ferramentas:

* [React Native](https://reactnative.dev/) (Framework principal)
* [TypeScript](https://www.typescriptlang.org/) & JavaScript (Lógica do app)
* [Firebase Auth](https://firebase.google.com/docs/auth) (Autenticação de usuários)
* [Cloud Firestore](https://firebase.google.com/docs/firestore) (Banco de dados NoSQL em tempo real)
* [React Navigation](https://reactnavigation.org/) (Navegação Stack e Bottom Tabs)
* [React Native Calendars](https://github.com/wix/react-native-calendars) (Filtros por data)
* [React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts) (Visualização de dados)
* [React Native HTML to PDF](https://github.com/christopherdro/react-native-html-to-pdf) (Geração de relatórios)
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) (Ícones Feather)

## Dependências e Versões Necessárias

Para rodar este projeto, você precisará ter o ambiente React Native configurado.

* Node.js - Versão 18+ (Recomendado)
* JDK - Versão 11 ou 17
* Android Studio (Para emulador Android)
* Xcode (Para emulador iOS - apenas Mac)
* Conta no Firebase (Para configurar o backend)

## Como rodar o projeto ✅

1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/cesarbarts/MyFinances.git
cd MyFinances
npm install
# ou
yarn install
```

2. **Configuração do Firebase (Passo Crítico):**
   * Crie um projeto no Console do Firebase.
   * Adicione um app Android e baixe o arquivo `google-services.json`. Coloque-o em `android/app/`.
   * (Opcional) Adicione um app iOS e baixe o `GoogleService-Info.plist`. Coloque-o na pasta `ios/`.
   * Habilite o **Authentication** (Email/Senha) e o **Firestore Database** no console.

3. Para rodar no Android:

```bash
npx react-native run-android
```

4. Para rodar no iOS (Mac apenas):

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

Se tudo der certo, você verá a tela de Login/Cadastro do MyFinances.

## Como rodar os testes

Embora este projeto foca na implementação de features, você pode rodar os testes unitários padrão do Jest configurados no React Native com:

```bash
npm test
```

## 📌 Funcionalidades Detalhadas 📌

O **MyFinances** vai além de um simples CRUD. Ele inclui:

* **Autenticação Segura:** Login e registro integrados diretamente com o Firebase Auth.
* **Dashboard Financeiro:** Visualização rápida do saldo total, receitas e despesas com suporte a "Dark Mode" nativo das cores do app.
* **Filtros Inteligentes:** Uso do `react-native-calendars` para filtrar transações por datas específicas.
* **Análise Gráfica:** A tela "Analisar" exibe um gráfico de barras (`BarChart`) mostrando a evolução do saldo item a item.
* **Exportação de Relatórios:** Funcionalidade exclusiva que converte o resumo financeiro em HTML e gera um arquivo **PDF** pronto para ser compartilhado.

## ⚠️ Problemas enfrentados

Durante o desenvolvimento, enfrentei desafios técnicos que serviram de grande aprendizado.

### Problema 1: Gerenciamento de Estado Assíncrono com Firestore
Carregar dados do Firestore e calcular totais (Receitas/Despesas) causava, inicialmente, inconsistências visuais ou "flickering" na tela.
* **Como solucionar:** Utilizei o hook `useFocusEffect` com `useCallback` para garantir que os dados fossem recarregados sempre que a tela ganhasse foco, além de implementar um estado de `loading` (ActivityIndicator) para melhorar a experiência do usuário enquanto a promessa do banco de dados era resolvida.

### Problema 2: Geração e Compartilhamento de PDF
Transformar dados dinâmicos da lista em um arquivo PDF formatado e garantir que o caminho do arquivo fosse acessível para compartilhamento.
* **Como solucionar:** Integrei a biblioteca `react-native-html-to-pdf` montando uma string HTML dinamicamente dentro de um loop `forEach`. Após a geração, utilizei a API `Share` nativa do React Native apontando para o caminho `file://` retornado.

## ⏭️ Próximos passos

O projeto cumpriu o objetivo de consolidar conhecimentos, mas tenho planos para evoluí-lo:

1. **Notificações Push:** Implementar lembretes para contas a pagar.
2. **Categorias Personalizadas:** Permitir que o usuário crie suas próprias categorias com ícones e cores.
3. **Animações:** Adicionar animações de entrada utilizando `react-native-reanimated` para tornar a interface ainda mais fluida.
4. **Login Social:** Adicionar login com Google/Apple.
