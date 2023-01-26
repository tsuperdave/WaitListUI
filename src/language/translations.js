// exports object of languages to be used in other files after destructuring
// highlight selection and use ctrl + / to enable/disable comments and language
const translate = {
    en: {
    "Join Wait List":"Join Wait List",
    "...joining":"...joining",
    "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates",
    "Welcome to":"Welcome to",
    "Passenger Name":"Passenger Name",
    "Email":"Email",
    "Guests":"Guests",
    "Departure Time":"Departure Time",
    "Thank you":"Thank you",
    "wait list":"wait list",
    "Please enter a departure time":"Please enter a departure time",
    "Please enter a valid email address":"Please enter a valid email address",
    "Please enter your name. Length must be greater than 2 characers":"Please enter your name. Length must be greater than 2 characers",
    "We will send you an email and/or SMS once space is available.":"We will send you an email and/or SMS once space is available",
    "You have been successfully added to the":"You have been successfully added to the",
    "Ok":"Ok",
    "Length must be greater than 2 characers.":"Length must be greater than 2 characers.",
    "Must enter a valid email address.":"Must enter a valid email address.",
    "Email incorrect format.":"Email incorrect format.",
    "Please enter a departure time.":"Please enter a departure time.",
    "Missing environment input":"Missing environment input",
    "Missing lounge code.":"Missing lounge code.",
    "Missing name.":"Missing name.",
    "Missing email.":"Missing email.",
    "Missing phone or incorrect length.":"Missing phone or incorrect length.",
    "Missing guests or not within range.":"Missing guests or not within range.",
    "Missing departure time.":"Missing departure time."

    },
    // ar: {
    // "Join Wait List":"الانضمام إلى قائمة الانتظار",
    // "...joining":"...انضمام",
    // "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"انقر هنا للموافقة على تلقي تنبيهات عبر البريد الإلكتروني / الرسائل القصيرة من خدمات Collinson بخصوص تحديثات قائمة الانتظار",
    // "Welcome to":"مرحبا بك في",
    // "Passenger Name":"اسم الراكب",
    // "Email":"بريد إلكتروني",
    // "Guests":"ضيوف",
    // "Departure Time":"وقت المغادرة",
    // "Thank you":"شكرا شكرا",
    // "wait list":"قائمة الانتظار",
    // "Please enter a departure time":"الرجاء إدخال وقت المغادرة",
    // "Please enter a valid email address":"يرجى إدخال عنوان بريد إلكتروني صالح",
    // "Please enter your name. Length must be greater than 2 characers":"الرجاء إدخال اسمك. يجب أن يكون الطول أكبر من حرفين",
    // "We will send you an email and/or SMS once space is available.":"بريدًا إلكترونيًا و / أو رسالة نصية قصيرة بمجرد توفر المساحة",
    // "You have been successfully added to the":"تمت إضافتك بنجاح إلى",
    // "Ok":"موافق"
    // },
    // de: {
    // "Join Wait List":"Warteliste beitreten",
    // "...joining":"...beitreten",
    // "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Klicken Sie hier, um zuzustimmen, E-Mail-/SMS-Benachrichtigungen von Collinson-Diensten bezüglich Aktualisierungen der Warteliste zu erhalten",
    // "Welcome to":"Willkommen zu",
    // "Passenger Name":"Passagier-Name",
    // "Email":"Email",
    // "Guests":"Gäste",
    // "Departure Time":"Abfahrtszeit",
    // "Thank you":"Danke schön",
    // "wait list":"Warteliste",
    // "Please enter a departure time":"Bitte geben Sie eine Abfahrtszeit ein",
    // "Please enter a valid email address":"Bitte geben Sie eine gültige E-Mail-Adresse ein",
    // "Please enter your name. Length must be greater than 2 characers":"Bitte geben Sie Ihren Namen ein. Die Länge muss mehr als 2 Zeichen betragen",
    // "We will send you an email and/or SMS once space is available.":"Wir senden Ihnen eine E-Mail und/oder SMS, sobald ein Platz verfügbar ist",
    // "You have been successfully added to the":"Sie wurden erfolgreich zum hinzugefügt",
    // "Ok":"Ok"
    // },
    es: {
    "Join Wait List":"Únase a la lista de espera",
    "...joining":"...unión",
    "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Haga clic aquí para aceptar recibir alertas por correo electrónico/SMS de los servicios de Collinson con respecto a las actualizaciones de la lista de espera",
    "Welcome to":"Bienvenido a",
    "Passenger Name":"Nombre del Pasajero",
    "Email":"Correo electrónico",
    "Guests":"Invitados",
    "Departure Time":"Hora de Salida",
    "Thank you":"Gracias",
    "wait list":"lista de espera",
    "Please enter a departure time":"Ingrese una hora de salida",
    "Please enter a valid email address":"Ingrese una dirección de correo electrónico válida",
    "Please enter your name. Length must be greater than 2 characers":"Por favor ingrese su nombre. La longitud debe ser mayor a 2 caracteres",
    "We will send you an email and/or SMS once space is available.":"Le enviaremos un correo electrónico y/o SMS una vez que haya espacio disponible",
    "You have been successfully added to the":"Ha sido agregado exitosamente a",
    "Ok":"De acuerdo",
    "Length must be greater than 2 characers.":"La longitud debe ser mayor a 2 caracteres.",
    "Must enter a valid email address.":"Debe ingresar una dirección de correo electrónico válida.",
    "Email incorrect format.":"Email formato incorrecto.",
    "Please enter a departure time.":"Por favor ingrese una hora de salida.",
    "Missing environment input":"Falta entrada de entorno",
    "Missing lounge code.":"Falta el código del salón.",
    "Missing name.":"Nombre faltante.",
    "Missing email.":"Correo electrónico faltante.",
    "Missing phone or incorrect length.":"Teléfono perdido o longitud incorrecta.",
    "Missing guests or not within range.":"Invitados faltantes o no dentro del alcance.",
    "Missing departure time.":"Falta la hora de salida."  
    },
    // fr: {
    // "Join Wait List":"Rejoindre la liste d'attente",
    // "...joining":"...joindre",
    // "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Cliquez ici pour accepter de recevoir des alertes par e-mail/SMS des services Collinson concernant les mises à jour de la liste d'attente",
    // "Welcome to":"Bienvenue à",
    // "Passenger Name":"Nom du passager",
    // "Email":"E-mail",
    // "Guests":"Invités",
    // "Departure Time":"Heure de départ",
    // "Thank you":"Merci",
    // "wait list":"liste d'attente",
    // "Please enter a departure time":"Veuillez saisir une heure de départ",
    // "Please enter a valid email address":"S'il vous plaît, mettez une adresse email valide",
    // "Please enter your name. Length must be greater than 2 characers":"Veuillez entrer votre nom. La longueur doit être supérieure à 2 caractères",
    // "We will send you an email and/or SMS once space is available.":"Nous vous enverrons un e-mail et/ou un SMS dès qu'une place sera disponible",
    // "You have been successfully added to the":"Vous avez été ajouté avec succès au",
    // "Ok":"D'accord"
    // },
    // it: {
    // "Join Wait List":"Iscriviti alla lista d'attesa",
    // "...joining":"...unendo",
    // "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Fare clic qui per accettare di ricevere avvisi via e-mail/SMS dai servizi Collinson relativi agli aggiornamenti della lista d'attesa",
    // "Welcome to":"Benvenuto a",
    // "Passenger Name":"Nome del passeggero",
    // "Email":"E-mail",
    // "Guests":"Ospiti",
    // "Departure Time":"Orario di partenza",
    // "Thank you":"Grazie",
    // "wait list":"lista d'attesa",
    // "Please enter a departure time":"Inserisci un orario di partenza",
    // "Please enter a valid email address":"Si prega di inserire un indirizzo email valido",
    // "Please enter your name. Length must be greater than 2 characers":"Inserisci il tuo nome. La lunghezza deve essere maggiore di 2 caratteri",
    // "We will send you an email and/or SMS once space is available.":"Ti invieremo un'e-mail e/o un SMS non appena lo spazio sarà disponibile",
    // "You have been successfully added to the":"Sei stato aggiunto con successo al",
    // "Ok":"Ok"    
    // },
    pt: {
    "Join Wait List":"Entrar na lista de espera",
    "...joining":"...juntando-se",
    "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Clique aqui para concordar em receber alertas por e-mail/SMS dos serviços da Collinson sobre atualizações da lista de espera",
    "Welcome to":"Bem-vindo ao",
    "Passenger Name":"Nome do passageiro",
    "Email":"E-mail",
    "Guests":"Convidados",
    "Departure Time":"Hora de partida",
    "Thank you":"Obrigado",
    "wait list":"lista de espera",
    "Please enter a departure time":"Insira um horário de partida",
    "Please enter a valid email address":"Por favor insira um endereço de e-mail válido",
    "Please enter your name. Length must be greater than 2 characers":"Digite seu nome. O comprimento deve ser maior que 2 caracteres",
    "We will send you an email and/or SMS once space is available.":"Enviaremos um e-mail e/ou SMS assim que o espaço estiver disponível",
    "You have been successfully added to the":"Você foi adicionado com sucesso ao",
    "Ok":"Ok",
    "Length must be greater than 2 characers.":"Comprimento deve ser maior que 2 caracteres.",
    "Must enter a valid email address.":"Deve inserir um endereço de e-mail válido.",
    "Email incorrect format.":"Email incorrect format.",
    "Please enter a departure time.":"Por favor, insira um horário de partida.",
    "Missing environment input":"Faltando entrada de ambiente",
    "Missing lounge code.":"Código da sala VIP ausente.",
    "Missing name.":"Nome ausente.",
    "Missing email.":"E-mail ausente.",
    "Missing phone or incorrect length.":"Telefone ausente ou comprimento incorreto.",
    "Missing guests or not within range.":"Convidados ausentes ou fora do alcance.",
    "Missing departure time.":"Falta hora de partida."
    },
    // ru: {
    // "Join Wait List":"Присоединяйтесь к списку ожидания",
    // "...joining":"...присоединение",
    // "Click here to agree to receive email/SMS alerts from Collinson services regarding Wait list updates":"Нажмите здесь, чтобы согласиться получать уведомления по электронной почте/SMS от служб Collinson об обновлениях списка ожидания",
    // "Welcome to":"Добро пожаловать в",
    // "Passenger Name":"Имя пассажира",
    // "Email":"Электронное письмо",
    // "Guests":"Гости",
    // "Departure Time":"Время отправления",
    // "Thank you":"Спасибо",
    // "wait list":"лист ожидания",
    // "Please enter a departure time":"Пожалуйста, введите время отправления",
    // "Please enter a valid email address":"Пожалуйста, введите действительный адрес электронной почты",
    // "Please enter your name. Length must be greater than 2 characers":"Пожалуйста, введите ваше имя. Длина должна быть больше 2 символов",
    // "We will send you an email and/or SMS once space is available.":"Мы отправим вам электронное письмо и/или SMS, как только освободится место",
    // "You have been successfully added to the":"Вы успешно добавлены в",
    // "Ok":"Хорошо"    
    // }  
}

export { translate }