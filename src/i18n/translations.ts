export type Language = 'en' | 'pt' | 'es';

export interface Translations {
    // Welcome screen
    appTitle: string;
    appSubtitle: string;
    startCreating: string;

    // Name input
    addGuestNames: string;
    whoInPuzzle: string;
    addGuestPlaceholder: string;
    pasteListPlaceholder: string;
    addBulkList: string;
    addedGuests: string;
    noGuestsYet: string;
    guestList: string;

    // Configuration
    puzzleSettings: string;
    customizeGrid: string;
    rows: string;
    columns: string;
    keepSurnames: string;
    dontSplitLastNames: string;
    configuration: string;

    // Navigation
    nextSettings: string;
    generate: string;

    // Results
    yourPuzzle: string;
    readyToPrint: string;
    print: string;
    tryAgain: string;
    findTheGuests: string;
    weddingOf: string;

    // Puzzle states
    readyToCreate: string;
    addNamesAndGenerate: string;
    someNamesCantFit: string;
    tryIncreasingGrid: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        appTitle: 'Name Word Search Generator',
        appSubtitle: 'Create a personalized word search puzzle.',
        startCreating: 'Start Creating',

        addGuestNames: 'Add Guest Names',
        whoInPuzzle: 'Who should be hidden in the puzzle?',
        addGuestPlaceholder: 'Add guest name...',
        pasteListPlaceholder: 'Or paste a list (one per line)...',
        addBulkList: 'Add Bulk List',
        addedGuests: 'Added Guests',
        noGuestsYet: 'No guests added yet',
        guestList: 'Guest List',

        puzzleSettings: 'Puzzle Settings',
        customizeGrid: 'Customize the grid size and options',
        rows: 'Rows',
        columns: 'Columns',
        keepSurnames: 'Keep Surnames',
        dontSplitLastNames: "Don't split last names",
        configuration: 'Configuration',

        nextSettings: 'Next: Settings',
        generate: 'Generate',

        yourPuzzle: 'Your Puzzle',
        readyToPrint: 'Ready to print!',
        print: 'Print',
        tryAgain: 'Try Again',
        findTheGuests: 'Find the Guests',
        weddingOf: 'Wedding of [Name] & [Name]',

        readyToCreate: 'Ready to create your puzzle',
        addNamesAndGenerate: 'Add names and click Generate to start',
        someNamesCantFit: "Some names couldn't fit:",
        tryIncreasingGrid: 'Try increasing grid size',
    },

    pt: {
        appTitle: 'Caça-palavras de Nomes',
        appSubtitle: 'Crie um caça palavras personalizado.',
        startCreating: 'Começar a Criar',

        addGuestNames: 'Adicionar Nomes dos Convidados',
        whoInPuzzle: 'Quem deve estar escondido no caça palavras?',
        addGuestPlaceholder: 'Adicionar nome do convidado...',
        pasteListPlaceholder: 'Ou cole uma lista (um por linha)...',
        addBulkList: 'Adicionar Lista em Massa',
        addedGuests: 'Convidados Adicionados',
        noGuestsYet: 'Nenhum convidado adicionado ainda',
        guestList: 'Lista de Convidados',

        puzzleSettings: 'Configurações do Caça-palavras',
        customizeGrid: 'Personalize o tamanho da grade e opções',
        rows: 'Linhas',
        columns: 'Colunas',
        keepSurnames: 'Manter Sobrenomes',
        dontSplitLastNames: 'Não dividir sobrenomes',
        configuration: 'Configuração',

        nextSettings: 'Próximo: Configurações',
        generate: 'Gerar',

        yourPuzzle: 'Seu Quebra-Cabeça',
        readyToPrint: 'Pronto para imprimir!',
        print: 'Imprimir',
        tryAgain: 'Gerar Novamente',
        findTheGuests: 'Encontre os Convidados',
        weddingOf: 'Casamento de [Nome] & [Nome]',

        readyToCreate: 'Pronto para criar seu caça palavras',
        addNamesAndGenerate: 'Adicione nomes e clique em Gerar para começar',
        someNamesCantFit: 'Alguns nomes não couberam:',
        tryIncreasingGrid: 'Tente aumentar o tamanho da grade',
    },

    es: {
        appTitle: 'Rompecabezas de Nombres',
        appSubtitle: 'Crea un rompecabezas de palabras personalizado.',
        startCreating: 'Comenzar a Crear',

        addGuestNames: 'Agregar Nombres de Invitados',
        whoInPuzzle: '¿Quién debería estar oculto en el rompecabezas?',
        addGuestPlaceholder: 'Agregar nombre de invitado...',
        pasteListPlaceholder: 'O pega una lista (uno por línea)...',
        addBulkList: 'Agregar Lista Masiva',
        addedGuests: 'Invitados Agregados',
        noGuestsYet: 'No se han agregado invitados aún',
        guestList: 'Lista de Invitados',

        puzzleSettings: 'Configuración del Rompecabezas',
        customizeGrid: 'Personaliza el tamaño de la cuadrícula y opciones',
        rows: 'Filas',
        columns: 'Columnas',
        keepSurnames: 'Mantener Apellidos',
        dontSplitLastNames: 'No dividir apellidos',
        configuration: 'Configuración',

        nextSettings: 'Siguiente: Configuración',
        generate: 'Generar',

        yourPuzzle: 'Tu Rompecabezas',
        readyToPrint: '¡Listo para imprimir!',
        print: 'Imprimir',
        tryAgain: 'Intentar de Nuevo',
        findTheGuests: 'Encuentra a los Invitados',
        weddingOf: 'Boda de [Nombre] & [Nombre]',

        readyToCreate: 'Listo para crear tu rompecabezas',
        addNamesAndGenerate: 'Agrega nombres y haz clic en Generar para comenzar',
        someNamesCantFit: 'Algunos nombres no cupieron:',
        tryIncreasingGrid: 'Intenta aumentar el tamaño de la cuadrícula',
    },
};
