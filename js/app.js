const GITHUB_USERNAME = "grazzianixf";

const URL_REPOS = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const URL_GITHUB_IO = `https://${GITHUB_USERNAME}.github.io`;
const URL_GITHUB = `https://github.com/${GITHUB_USERNAME}`;
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

const createNewListItem = repo => {
   let newListItem = document.createElement("li");

   let newDivListItem = createNewDivListItem();
   newListItem.appendChild(newDivListItem);

   let newText = createText(repo.name);

   newDivListItem.appendChild(newText);

   let divInterna = document.createElement("div");

   if (repo.has_pages) {
      let linkPage = createNewLink(`${URL_GITHUB_IO}/${repo.name}`);
      linkPage.appendChild(createIconLink("Page"));

      divInterna.appendChild(linkPage);
   }

   let linkRepo = createNewLink(`${URL_GITHUB}/${repo.name}`);
   linkRepo.appendChild(createIconLink("Repo"));

   divInterna.appendChild(linkRepo);

   newDivListItem.appendChild(divInterna);   

   return newListItem;
}

const createNewLink = (href) => {
	let newLink = document.createElement("a");
	newLink.href = href;
	newLink.target = "_blank";

	return newLink;
};

const createText = (content) => document.createTextNode(content);

const createIconLink = (title) =>
	Object.assign(document.createElement("img"), {
		src: "assets/arrow-square-out-fill.png",
      title, 
		width: "20",
		height: "20",
	});

const updateRepositoriesList = (repos) => {
	const repositoriesList = document.getElementById("repositoriesList");

	repos &&
		repos.map &&
		repos.map((repo) => {
			if (repo.archived || repo.disabled) {
				return;
			}

			let newListItem = createNewListItem(repo);

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
	updateMessage(MSG_UPDATE_REPOSITORIES_LIST);

	fetch(URL_REPOS)
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
