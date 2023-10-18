let currentShiftId = null;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startShift").addEventListener("click", startWorkShift);
    document.getElementById("endShift").addEventListener("click", endWorkShift);
});

function startWorkShift() {
    fetch("/timemanagement/api/start_work_shift/", { method: "POST" })
    .then(response => response.json())
    .then(data => {
        currentShiftId = data.id;
        document.getElementById("startShift").disabled = true;
        document.getElementById("endShift").disabled = false;
    });
}

function endWorkShift() {
    fetch(`/timemanagement/api/end_work_shift/${currentShiftId}/`, { method: "POST" })
    .then(response => response.json())
    .then(data => {
        currentShiftId = null;
        document.getElementById("startShift").disabled = false;
        document.getElementById("endShift").disabled = true;
    });
}
 