# doropomo

O **Doropomo** é um aplicativo de produtividade focado na técnica Pomodoro, desenvolvido em React Native utilizando Expo. O objetivo do app é ajudar o usuário a organizar suas tarefas e ciclos de estudo, alternando entre períodos de foco e intervalos, além de permitir o gerenciamento eficiente de tarefas diárias.

## Estrutura e Funcionamento Geral

O projeto está organizado em uma estrutura clara, separando arquivos de configuração, assets, componentes reutilizáveis, contexto global, navegação e as telas principais do app. O ponto de entrada é o arquivo `index.js`, que registra o componente principal da aplicação. O componente raiz, definido em `App.js`, envolve toda a aplicação com o `TimerProvider`, responsável por fornecer o contexto global do timer, e renderiza a navegação principal através do `StackNavigation`.

```
doropomo/
├── .gitignore
├── app.json
├── babel.config.js
├── index.js
├── package.json
├── assets/
│   ├── BackgroundDoropomo.png
│   └── doropomoLogo.png
├── src/
│   ├── App.js
│   ├── colors.json
│   ├── components/
│   │   ├── tasks/
│   │   │   └── ListTasks.js
│   │   └── timer/
│   │       ├── Intervals.js
│   │       └── Stopwatch.js
│   ├── context/
│   │   └── TimerContext.js
│   ├── navigation/
│   │   ├── StackNavigation.js
│   │   └── TabNavigation.js
│   └── views/
│       ├── Home.js
│       ├── Tasks.js
│       └── Timer.js
```

---

### Navegação

A navegação do app é composta por duas camadas: uma navegação em pilha (stack) e uma navegação por abas (tabs). O arquivo `StackNavigation.js` define as rotas principais do app, incluindo a tela inicial (Pomodoro), Home, Timer e Tasks. A tela inicial utiliza o componente `TabNavigation`, que organiza as três principais telas do app (Home, Timer e Tasks) em abas na parte inferior da tela, cada uma com seu ícone personalizado. O cabeçalho e os labels das abas são ocultados para uma interface mais limpa.

### Contexto Global

O contexto global do timer é implementado em `TimerContext.js`. Ele utiliza a Context API do React para compartilhar o estado de execução do timer (`isRunning`) entre diferentes componentes da aplicação. Isso permite que o timer seja controlado de qualquer parte do app, garantindo uma experiência consistente para o usuário.

### Paleta de Cores e Assets

As cores principais do app estão definidas em `colors.json`, facilitando a manutenção e a padronização visual. As imagens utilizadas, como o fundo e o logo, ficam na pasta `assets`.

## Componentes

O app possui componentes reutilizáveis organizados em subpastas dentro de `src/components`. Os principais são:

- **ListTasks.js**: Responsável por exibir a lista de tarefas do usuário. Permite marcar tarefas como concluídas, editar e excluir tarefas. Utiliza o componente `FlatList` para renderização eficiente e o `Picker` para seleção do dia da semana ao editar uma tarefa. As funções principais são:

  - `editTask`: Atualiza os dados de uma tarefa específica, permitindo ao usuário modificar título, peso, tempo estimado e dia da semana.
  - `deleteTask`: Remove uma tarefa da lista.
  - Renderização condicional: Alterna entre o modo de edição e visualização das tarefas.

- **Intervals.js**: Gerencia os ciclos do Pomodoro, alternando entre períodos de estudo, intervalos curtos e intervalos longos. Utiliza o componente `Stopwatch` para controlar o tempo regressivo de cada ciclo. As principais funções são:

  - `handleTimerEnd`: Exibe um alerta ao final de cada ciclo, perguntando ao usuário se deseja iniciar outro temporizador. Se sim, avança para o próximo ciclo; se não, reinicia o estado do timer.
  - `saveStudyTime` e `loadStudyTime`: Salvam e carregam o tempo total de estudo do usuário utilizando o AsyncStorage.
  - Controle de fluxo: Alterna automaticamente entre estudo, intervalo curto e intervalo longo, atualizando o estado e o próximo ciclo a ser exibido.

- **Stopwatch.js**: Implementa o temporizador regressivo. Recebe o tempo inicial, decrementa a cada segundo enquanto o timer está rodando e notifica o componente pai ao chegar a zero. As funções principais são:
  - `useEffect`: Controla o ciclo de decremento do tempo e chama a função de término (`onTimerEnd`) quando o tempo chega a zero.
  - `formatTime`: Formata o tempo restante em minutos e segundos para exibição amigável ao usuário.

## Telas (Views)

As telas principais do app estão na pasta `views`:

- **Home.js**: É a tela inicial do app, exibindo um resumo do timer (sem botões de ação) e a lista de tarefas em um layout compacto. Utiliza o componente `ImageBackground` para aplicar o fundo personalizado e chama os componentes `Timer` e `Tasks` com propriedades que ocultam botões e imagens, tornando a tela mais enxuta.

- **Tasks.js**: Tela dedicada ao gerenciamento de tarefas. Permite ao usuário adicionar novas tarefas, editar, excluir e marcar como concluídas. As tarefas são persistidas localmente usando AsyncStorage, garantindo que não sejam perdidas ao fechar o app. As funções principais são:

  - `addNewTask`: Adiciona uma nova tarefa à lista, gerando um ID único e limpando o formulário após a adição.
  - `useFocusEffect`: Carrega as tarefas salvas no AsyncStorage sempre que a tela é acessada, garantindo que a lista esteja sempre atualizada.
  - `useEffect`: Salva as tarefas no AsyncStorage sempre que a lista é modificada.
  - Renderização condicional: Alterna entre o formulário de nova tarefa e a lista de tarefas, conforme a ação do usuário.
  - Utiliza o componente `ListTasks` para exibir e gerenciar as tarefas.

- **Timer.js**: Tela dedicada ao ciclo Pomodoro. Exibe o temporizador, controla o início e pausa do timer e mostra ao usuário qual será o próximo intervalo (estudo, intervalo curto ou longo). As funções principais são:
  - Utiliza o contexto `TimerContext` para controlar o estado global do timer.
  - Utiliza o componente `Intervals` para gerenciar os ciclos do Pomodoro.
  - Exibe o botão de play/pause e o nome do próximo intervalo, permitindo ao usuário controlar facilmente o fluxo dos ciclos.

## Fluxo de Uso

Ao abrir o app, o usuário tem acesso rápido ao timer Pomodoro e à lista de tarefas. O timer pode ser iniciado ou pausado a qualquer momento, alternando automaticamente entre períodos de estudo e intervalos. Ao final de cada ciclo, o app exibe um alerta para o usuário decidir se deseja continuar. As tarefas podem ser adicionadas, editadas, marcadas como concluídas ou removidas, e todas as informações são salvas localmente no dispositivo.

A navegação por abas permite alternar facilmente entre as telas principais, enquanto a navegação em pilha possibilita transições para telas específicas quando necessário.

## Considerações Finais

O Doropomo não utiliza backend: todas as informações são salvas localmente, tornando o app rápido e seguro para uso pessoal. O código está organizado para facilitar a manutenção e expansão, com separação clara de responsabilidades entre componentes, contexto, navegação e views. Recomenda-se a leitura dos comentários nos arquivos para entender detalhes de implementação e facilitar futuras contribuições.

Para rodar o projeto, basta instalar as dependências com `npm install` e iniciar com `npm start`. O app pode ser executado em dispositivos Android, iOS ou na web utilizando Expo.

Contribuições são bem-vindas! Basta fazer um fork, criar uma branch para sua feature ou correção e enviar um pull request com uma descrição clara das mudanças.
