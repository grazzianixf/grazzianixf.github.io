const URL_REPOS = "https://api.github.com/users/grazzianixf/repos";
const URL_GITHUB_IO = "https://grazzianixf.github.io";
const MSG_UPDATE_REPOSITORIES_LIST = "Atualizando lista de repositórios...";
const MSG_ERROR_UPDATE_REPOSITORIES_LIST =
	"Erro ao atualizar lista de repositórios.";

const updateMessage = (content) => {
	document.getElementById("spanMessage").textContent = content;
};

const createNewListItem = () => {
	let newListItem = document.createElement("li");

	return newListItem;
};

const createNewLink = (href, text) => {
	let newLink = document.createElement("a");
	newLink.href = href;
	newLink.text = text;
	newLink.target = "_blank";

	return newLink;
};

const createText = (content) => document.createTextNode(content);

const updateRepositoriesList = (repos) => {
	const repositoriesList = document.getElementById("repositoriesList");

	repos &&
		repos.map &&
		repos.map((repo) => {
			let newListItem = createNewListItem();
			if (repo.has_pages) {
				let newLink = createNewLink(
					`${URL_GITHUB_IO}/${repo.name}`,
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

const handleError = (msg, error) => {
	console.error(error);

	let messageError = msg + " " + (error?.message ? error?.message : error);

	updateMessage(messageError);
};

const handleResponse = (response) => {
	if (response.status !== 200) {
		console.log(`Response Status: `, response.status);

      // TODO tratar caso não seja json
		return response.json().then((result) => Promise.reject(result));
	}

	return response.json();
};

const loadData = () => {
	let url = URL_REPOS;

	updateMessage(MSG_UPDATE_REPOSITORIES_LIST);

	fetch(url)
		.then((response) => handleResponse(response))
		.then((repos) => {
			updateRepositoriesList(repos);
			updateMessage("");
		})
		.catch((error) => handleError(MSG_ERROR_UPDATE_REPOSITORIES_LIST, error));
};

const setupEvents = (_) => {
	// btnEnviar.addEventListener("click", enviar);
};

const load = () => {
	loadData();
	setupEvents();
};

document.addEventListener("DOMContentLoaded", load, false);
