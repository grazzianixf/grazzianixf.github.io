const startLoading = (_) => {
	// TODO
	// desabilitar todos os componentes do formulario que estão habilitados
	// colocar a msg passada como parametro em um span entre o requestBody e responseBody. Sendo que esse span só aparece quando tiver alguma msg nele
};

const stopLoading = (_) => {
	// TODO
	// habilitar todos os campso do formulario, exceto o responseBody que deve ser sempre disabled
};

const createNewListItem = (content) => {
	let newListItem = document.createElement("li");
	// newListItem.innerHTML = content;

	return newListItem;
};

const createNewLink = (href, text) => {
	let newLink = document.createElement("a");
	newLink.href = href;
	newLink.text = text;

	console.log(`newLink`, newLink);
	return newLink;
};

const createText = content => document.createTextNode(content)

const updateRepositoriesList = (repos) => {
	const repositoriesList = document.getElementById("repositoriesList");

	console.log(`repositoriesList`, repositoriesList);

	repos &&
		repos.map &&
		repos.map((repo) => {
			let newListItem = createNewListItem();
			if (repo.has_pages) {
				let newLink = createNewLink(
					`https://grazzianixf.github.io/${repo.name}`,
					repo.name
				);

				newListItem.appendChild(newLink);
			} else {
				let newText = createText(repo.name);

				newListItem.appendChild(newText);
			}

			repositoriesList.appendChild(newListItem);
		});
};

const loadData = () => {
	let url = "https://api.github.com/users/grazzianixf/repos";

	startLoading("Processando...");

	fetch(url)
		.then((response) => response.json())
		.then((repos) => {
			// repos && repos.map && repos.map(repo => console.log(repo.name));
			updateRepositoriesList(repos);
			stopLoading();
		});

	// TODO implementar o catch para exibir no responseBody os erros vindos  no response caso o status da response seja diferente da faixa 200
};

const setupEvents = (_) => {
	// btnEnviar.addEventListener("click", enviar);
};

const load = () => {
	loadData();
	setupEvents();
};

document.addEventListener("DOMContentLoaded", load, false);
