// aggregate function
function aggStats(data) { // array of Session objects
    let grandTotalModulesStudied = 0;
    let totalAverageScore = 0;
    let totalScore = 0;
    let totalTimeStudied = 0;
    data.forEach(s=> {
        grandTotalModulesStudied+= s.totalModulesStudied;
        totalScore+= s.averageScore*s.totalModulesStudied;
        totalTimeStudied += s.timeStudied;
    });
    totalAverageScore = totalScore/grandTotalModulesStudied;
    return {
        "totalModulesStudied": grandTotalModulesStudied,
        "averageScore": totalAverageScore,
        "timeStudied": totalTimeStudied
    }
}
module.exports = aggStats; 