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

document.addEventListener("DOMContentLoaded", function() {
    // ... existing code ...

    // Add event listener for form submission
    document.getElementById("manualEntryForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        addManualWorkShift();
    });
});

function addManualWorkShift() {
    const startTime = new Date(document.getElementById("manualStartTime").value).toISOString();
    const endTime = new Date(document.getElementById("manualEndTime").value).toISOString();
    
    fetch("/timemanagement/api/start_work_shift/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ start_time: startTime, end_time: endTime })
    })
    .then(response => response.json())
    .then(data => {
        fetchWorkShifts(); // Refresh work shifts list
    });
}
 