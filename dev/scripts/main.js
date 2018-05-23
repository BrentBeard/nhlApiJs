const app = {};

app.events = function () {

};

app.init = function () {
    app.events();
};

app.gather = () => {
    for(let i = 0; i < 31; i++) {
        
    return $.ajax({
        
        url: `https://statsapi.web.nhl.com/api/v1/teams/`,
        method: 'GET',
        data: {

        }
    }).then(function (response){
        // console.log(response.teams);
        const teams = response.teams;
        teams.map((team) => {
            // console.log(team.id);
            const id = team.id;
            $.ajax({
                url: `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`,
                method: 'GET',
                data:{}
            }).then(function (newRes){
                // console.log(newRes.roster)
                const roster = newRes.roster;
                roster.map((player) => {
                    // console.log(player.person.id);
                    const playerID = player.person.id;
                    // console.log(playerID);
                    // console.log(playerID);
                    
                    $.ajax({
                        url: `https://statsapi.web.nhl.com/api/v1/people/${playerID}/?expand=person.stats&stats=gameLog`,
                        method: 'GET',
                        data: {}
                    }).then(function(playerList){
                        // console.log(playerList);
                        const playerObject = playerList.people[0];
                        console.log(playerObject);
                        app.search(playerObject);

        //Other end points for personal stats
        // ?expand = person.stats & stats=statsSingleSeason
        // ?expand=person.stats&stats=gameLog






                        // if(playerObject.fullName == `Nazem Kadri`) {
                        //     console.log(playerObject);
                        // } else {
                        //     null
                        // }
                        // console.log(playerObject);
                        // const playerCall = playerObject.fullName;
                      
                        
                        // let PlayerStats = Object.create(playerCall);
                        // console.log(PlayerStats);
                        // function Player(playerArray) {
                        //     playerArray : playerObject
                        //     console.log(PlayerArray);
                        // }

                        
                        
                        // const shP = playerObject.stats[0].splits[0].stat.shotPct
                        // console.log(`${shP} - ${playerObject.fullName}`)
                        // console.log(playerObject.id + playerObject.fullName);

                        // const playerTag = playerList.people[0]
                        // console.log(playerList);
                    })
                })
            })
        }

    )})

}
}

app.search = (playerObject) => {
    $('form').on('submit', function (e) {
        e.preventDefault();

        let playerGrab = $('input').val();


        // console.log(playerGrab)
        // console.log(playerObject);
        if(playerObject.fullName === playerGrab)  {
            console.log(playerObject.stats[0].splits[0].season)
            console.log(playerObject.stats[0].splits[0].stat)
            $('ul.list').html(`<li>${playerObject.stats[0].splits[0].stat.shotPct}</li>`);
        } 
    })
}

$(function () {
    app.init();
    app.gather();


});

