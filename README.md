# doropomo

## Visão Geral

**Doropomo** é um aplicativo de produtividade baseado na técnica Pomodoro, desenvolvido em React Native com Expo. Ele permite ao usuário gerenciar tarefas e controlar ciclos de estudo e intervalos, promovendo foco e organização.

---

## Estrutura do Projeto

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

## Descrição dos Arquivos e Funcionalidades

### Arquivos de Configuração

- **.gitignore**  
  Arquivos e pastas ignorados pelo Git (ex: `node_modules`, arquivos temporários, builds).

- **app.json**  
  Configurações do Expo, como nome, ícone, splash, e opções de build para Android/iOS/Web.

- **babel.config.js**  
  Configuração do Babel para transpilar o código JavaScript, incluindo suporte ao React Native Reanimated.

- **package.json**  
  Lista dependências, scripts de inicialização (`npm start`, `npm run android`, etc.) e metadados do projeto.

- **index.js**  
  Ponto de entrada do app. Registra o componente principal usando Expo.

---

### Pasta `assets/`

Imagens utilizadas no app, como o fundo e o logo.

---

### Pasta `src/`

#### App.js

- Componente raiz do app.
- Envolve toda a aplicação com o `TimerProvider` para fornecer contexto global do timer.
- Renderiza a navegação principal (`StackNavigation`).

---

### Contexto

#### context/TimerContext.js

- Cria o contexto global `TimerContext` para controlar o estado do timer (`isRunning`, `setIsRunning`).
- Permite que diferentes componentes acessem e modifiquem o estado do timer.
- Exemplo de uso:
  - `const { isRunning, setIsRunning } = useContext(TimerContext);`

---

### Navegação

#### navigation/StackNavigation.js

- Define a navegação em pilha (stack) do app.
- Telas principais: Pomodoro (tabs), Home, Timer e Tasks.
- Usa o componente `TabNavigation` como tela inicial.

#### navigation/TabNavigation.js

- Define a navegação por abas (tabs) entre as telas Home, Timer e Tasks.
- Usa ícones personalizados para cada aba.
- Esconde o header e os labels das abas.

---

### Paleta de Cores

#### colors.json

- Define as cores principais do app, como fundo, texto, vermelho e verde.

---

### Componentes

#### components/tasks/ListTasks.js

- Exibe a lista de tarefas.
- Permite marcar tarefas como concluídas, editar e excluir.
- Utiliza `FlatList` para renderização eficiente.
- Principais funções:
  - **editTask**: Atualiza os dados de uma tarefa.
  - **deleteTask**: Remove uma tarefa da lista.
  - Renderização condicional para modo de edição ou visualização.
  - Usa o componente `Picker` para selecionar o dia da semana ao editar.

#### components/timer/Intervals.js

- Gerencia os ciclos de estudo e intervalos (curto e longo) do Pomodoro.
- Controla o tipo de intervalo, duração, e exibe alertas ao final de cada ciclo.
- Usa o componente `Stopwatch` para o temporizador regressivo.
- Principais funções:
  - **handleTimerEnd**: Exibe um alerta ao fim do ciclo, perguntando se o usuário deseja iniciar outro temporizador.
  - **saveStudyTime/loadStudyTime**: Salva e carrega o tempo total de estudo no AsyncStorage.
  - Controla o fluxo entre estudo, intervalo curto e intervalo longo, atualizando o estado conforme o ciclo.

#### components/timer/Stopwatch.js

- Temporizador regressivo.
- Recebe tempo inicial, controla decremento e notifica quando chega a zero.
- Principais funções:
  - **useEffect**: Controla o decremento do tempo e chama `onTimerEnd` ao chegar a zero.
  - **formatTime**: Formata o tempo em minutos e segundos para exibição.

---

### Telas (Views)

#### views/Home.js

- Tela inicial do app.
- Exibe o timer (sem botões de ação) e a lista de tarefas em um layout compacto.
- Usa `ImageBackground` para o fundo.
- Chama os componentes `Timer` e `Tasks` com props para esconder botões e imagens.

#### views/Tasks.js

- Tela de gerenciamento de tarefas.
- Permite adicionar, editar, excluir e marcar tarefas como concluídas.
- As tarefas são persistidas usando AsyncStorage.
- Principais funções:
  - **addNewTask**: Adiciona uma nova tarefa à lista.
  - **useFocusEffect**: Carrega as tarefas do AsyncStorage ao entrar na tela.
  - **useEffect**: Salva as tarefas no AsyncStorage sempre que a lista é alterada.
  - Renderização condicional para formulário de nova tarefa ou lista de tarefas.
  - Usa o componente `ListTasks` para exibir e gerenciar as tarefas.

#### views/Timer.js

- Tela do Pomodoro.
- Exibe o temporizador, controla início/pausa e mostra qual será o próximo intervalo.
- Principais funções:
  - Usa o contexto `TimerContext` para controlar o estado do timer.
  - Usa o componente `Intervals` para gerenciar os ciclos.
  - Exibe o botão de play/pause e o nome do próximo intervalo.

---

## Fluxo Principal do App

1. **Timer Pomodoro**

   - O usuário inicia/pausa o timer.
   - O app alterna entre períodos de estudo e intervalos (curtos e longos).
   - Ao final de cada ciclo, um alerta é exibido para o usuário decidir se deseja continuar.

2. **Gerenciamento de Tarefas**

   - O usuário pode adicionar tarefas com título, peso, tempo estimado e dia da semana.
   - As tarefas podem ser marcadas como concluídas, editadas ou removidas.
   - As tarefas são salvas localmente no dispositivo.

3. **Navegação**
   - O app utiliza navegação por abas para alternar entre Home, Timer e Tasks.
   - A navegação em pilha permite transições entre telas específicas.

---

## Como Rodar o Projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o app:
   ```sh
   npm start
   ```
   Ou use:
   ```sh
   npm run android
   npm run ios
   npm run web
   ```

---

## Dependências Principais

- **React Native**: Framework principal para desenvolvimento mobile.
- **Expo**: Ferramenta para facilitar o desenvolvimento e build.
- **@react-navigation**: Navegação entre telas.
- **AsyncStorage**: Persistência local de dados.
- **react-native-uuid**: Geração de IDs únicos para tarefas.
- **@expo/vector-icons**: Ícones para UI.

---

## Observações

- O app salva tarefas e tempo de estudo localmente, não havendo backend.
- O código está organizado para facilitar manutenção e expansão.
- Recomenda-se ler os comentários nos arquivos para detalhes de implementação.

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature/fix.
3. Envie um pull request com uma descrição clara das mudanças.

---

## Contato

Dúvidas ou sugestões? Abra uma issue ou entre em contato com o mantenedor do projeto.
