const URL_REPOS = "https://api.github.com/users/grazzianixf/repos";
const URL_GITHUB_IO = "https://grazzianixf.github.io";
const MSG_UPDATE_REPOSITORIES_LIST = "Atualizando lista de repositórios...";
const MSG_ERROR_UPDATE_REPOSITORIES_LIST =
	"Erro ao atualizar lista de repositórios.";

const updateMessage = (content) => {
	document.getElementById("spanMessage").textContent = content;
};

const createNewDivListItem = () => {
	let div = document.createElement("div");
	div.setAttribute("class", "divDoLi");
	return div;
};

const createNewListItem = () => document.createElement("li");

const createNewLink = (href) => {
	let newLink = document.createElement("a");
	newLink.href = href;
	newLink.target = "_blank";

	return newLink;
};

const createText = (content) => document.createTextNode(content);

const createIconLink = (_) =>
	Object.assign(document.createElement("img"), {
		src: "assets/arrow-square-out-fill.png",
		width: "20",
		height: "20",
	});

const updateRepositoriesList = (repos) => {
	const repositoriesList = document.getElementById("repositoriesList");

	repos &&
		repos.map &&
		repos.map((repo) => {
			let newListItem = createNewListItem();

			let newDivListItem = createNewDivListItem();
			newListItem.appendChild(newDivListItem);

			let newText = createText(repo.name);

			newDivListItem.appendChild(newText);

			if (repo.has_pages) {
				let newLink = createNewLink(`${URL_GITHUB_IO}/${repo.name}`);

				newLink.appendChild(createIconLink());

				newDivListItem.appendChild(newLink);
			}

			repositoriesList.appendChild(newListItem);
		});
};

const handleDefaultError = (msg, error) => {
	console.error(error);

	let messageError = msg + " " + (error?.message ? error?.message : error);

	updateMessage(messageError);
};

const handleDefaultResponse = (response) => {
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
		.then((response) => handleDefaultResponse(response))
		.then((repos) => {
			updateRepositoriesList(repos);
			updateMessage("");
		})
		.catch((error) =>
			handleDefaultError(MSG_ERROR_UPDATE_REPOSITORIES_LIST, error)
		);
};

const setupEvents = (_) => {
	// btnEnviar.addEventListener("click", enviar);
};

const load = () => {
	loadData();
	setupEvents();
};

document.addEventListener("DOMContentLoaded", load, false);
