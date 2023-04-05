function handleSubmit(event) {
  event.preventDefault();
  //console.log("this is handle submit function");
  document.getElementById("search").addEventListener("click", async () => {
    const jobLevel = document.getElementById("jobLevel").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const options = {
      method: "GET",
      headers: {
        "Host": "data.usajobs.gov",
        "User-Agent": process.env.USERAGENT,
        "Authorization-Key":process.env.KEY,
      },
    };

    const response = await fetch(
      `https://data.usajobs.gov/api/search?JobCategoryCode=2210&Keyword=${jobTitle}&LocationName=${jobLevel}`,
      options
    );
    const finalData = await response.json();
    const jobs = finalData.SearchResult.SearchResultItems;
    details(jobs)

  });
}

/* const postData = async (url, data = {}) => {
  console.log('start post data', data)
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log('post finished',response.json());
  
}; */

const details =  (allData) => {
  const tbody = document.getElementById("tablebody");
  try {
    for (let data of allData) {
      //console.log(data);
      const response = data.MatchedObjectDescriptor;
      const tr = document.createElement("tr");
      const mark = `
    <th scope='row'>${response.ApplicationCloseDate.slice(0,10)}</th>
    <td><a href=${response.PositionURI}>${response.PositionTitle}</a>@${response.OrganizationName}</td>
    <td class="text-truncate" style="max-width: 20vw;">${response.UserArea.Details.MajorDuties}</td>
    <td class="text-truncate" style="max-width: 30vw;">${
      response.UserArea.Details.JobSummary
    }</td>
    <td class="text-truncate" style="max-width: 30vw;">${
      response.QualificationSummary
    }</td>
    `;

      tr.innerHTML = mark;

      tbody.appendChild(tr);
    }
  } catch (error) {
    console.log("get all data error", error);
  }
};
export { handleSubmit };
