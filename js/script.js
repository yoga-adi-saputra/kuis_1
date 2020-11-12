
const dataprov ="http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more";
const datacovid = document.querySelector('#data-covid');

function getListCovid(){
    fetch (dataprov)
    .then(response => response.json()) 
    .then(responseJson =>{
        console.log(responseJson);
        let cov = "";
        let i = 1;
        responseJson.forEach(covid => {
            cov += `
            <tr>
                <td style="padding-left:20px;">${i}.</td>
                <td>${covid.provinsi}</td>
                <td>${covid.kasus}</td>
                <td>${covid.sembuh}</td>
                <td>${covid.meninggal}</td>
                <td>${covid.dirawat}</td>
            </tr>
            `;
            i++;
        });
        datacovid.innerHTML =  `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            
                            <th>NO</th>
                            <th>Provinsi</th>
                            <th>Jumlah Kasus</th>
                            <th>Sembuh</th>
                             <th>Meninggal</th>
                            <th>Dirawat</th> 
                        </thead>
                        <tbody>
                            ${cov}
                        </tbody>
                    </table>
                </div>
            `;
    }).catch(err => {
        console.error(err);
    })
}

function getListCovidindo(){
    fetch (dataprov)
    .then(response => response.json()) 
    .then(responseJson =>{
        console.log(responseJson);
        let cov = "";
        let i = 1;
        responseJson.forEach(covid => {
            cov += `
            <tr>
                <td style="padding-left:20px;">${i}.</td>
                <td>${covid.provinsi}</td>
                <td>${covid.penambahan.positif}</td>
                <td>${covid.penambahan.sembuh}</td>
                <td>${covid.penambahan.meninggal}</td>
            </tr>
            `;
            i++;
        });
        datacovid.innerHTML =  `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            
                            <th>NO</th>
                            <th>Provinsi</th>
                            <th>Positif</th>
                            <th>Sembuh</th>
                            <th>Meninggal</th>
                            
                        </thead>
                        <tbody>
                            ${cov}
                        </tbody>
                    </table>
                </div>
            `;
       
    }).catch(err => {
        console.error(err);
    })
}

function loadPage(page) {
    switch (page) {
        case "datacovid":
            getListCovid();
            break;
        case "datars":
            getListCovidindo();
            break;
        
    }
}


document.addEventListener('DOMContentLoaded', function(){

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav, .topnav a").forEach(elm=>{
        elm.addEventListener("click",evt=>{
            let nav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(nav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "datacovid";
    loadPage(page);

})