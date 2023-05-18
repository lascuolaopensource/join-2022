import type { types as t } from 'shared';

export const s = {
	enroll: {
		info: {
			title: `Alcune note prima di iscriverti`,
			payment: `Questo corso è a pagamento.
                Per questioni gestionali ti chiediamo di pagare in anticipo il corso.
                Se non dovesse partire, ti rimborseremo immediatamente l'intero importo.`,
			letter: `Per iscriverti a questo corso è richiesta una lettera motivazionale.
                Se vuoi prepararla con calma prima di compilare il form di iscrizione noi ti aspettiamo qui :)`,
			accountCreation: `Per questioni gestionali, al termine dell'iscrizione verrà creato automaticamente un account Join.
                Riceverai una mail di conferma dell'avvenuta iscrizione.
                Se non sei interessato ad avere un account, ignora la mail:
                l'account verrà eliminato automaticamente appena la tua iscrizione al corso verrà confermata.`
		},
		button: {
			payment: 'Vai al pagamento',
			enroll: 'Iscriviti!'
		}
	},
	pay: {
		info: `Alcune note prima di pagare`,
		dataAgain: `Nella schermata successiva ti verranno nuovamente chiesti i dati.
			Ti chiediamo di ripetere quelli che hai già inserito in questa pagina.`,
		callout: `IMPORTANTE: Questo link è pubblico.
			Puoi condividerlo con chi effettuerà il pagamento per te,
			ma non condividerlo con nessun altro
			– altrimenti i dati di fatturazione saranno pubblici.`,
		link: `Questo link è contenuto nella mail che hai appena ricevuto.
			Se vuoi completare il pagamento in un secondo momento sai dove trovarlo,
			ma occhio alla data di scadenza!`
	},
	admin: {
		enrollments: {
			selectionNeeded:
				'È richiesta selezione dei partecipanti: è stato superato il numero massimo di iscrizioni',
			preconditions:
				"Sono richiesti dei prerequisiti per l'iscrizione al corso, verifica quali sono sulla pagina del corso prima di selezionare i partecipanti.",
			selectionNotNeeded:
				'NON è richiesta selezione dei partecipanti: è stato superato solo il numero minimo di iscrizioni.'
		}
	}
};

export const placeholders = {
	address: 'Nome via / piazza / etc. , n° civico'
};

export const enrollmentStates: Record<t.Enum_Enrollment_State, string> = {
	pending: 'In attesa di approvazione',
	approved: 'Approvata',
	awaitingPayment: 'In attesa di pagamento',
	rejected: 'Rifiutata'
};

export const enrollmentStatesAdmin: Record<t.Enum_Enrollment_State, string> = {
	pending: '⏸️ In attesa di approvazione',
	approved: '✅ Approvate',
	awaitingPayment: '💰 Pagamento non avvenuto',
	rejected: '❌ Rifiutate'
};
