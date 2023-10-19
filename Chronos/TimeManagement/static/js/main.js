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

function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }
  
  function formatDuration(durationStr) {
    if (durationStr === null || durationStr === undefined) {
      return "Not Yet Calculated";
    }
    
    // Parse the "HH:MM:SS" format into hours, minutes, and seconds
    const parts = durationStr.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
  
    // Round up to the nearest minute if there are any seconds
    const totalMinutes = minutes + (seconds > 0 ? 1 : 0);
  
    return `${hours} hours and ${totalMinutes} minutes`;
  }
  
 
function fetchWorkShifts() {
    fetch('/timemanagement/api/list_work_shifts/')
      .then(response => response.json())
      .then(data => {
        renderWorkShifts(data);
      });
  }

  function renderWorkShifts(workShifts) {
    const workShiftList = document.getElementById('workShiftList');
    workShiftList.innerHTML = '';  // Clear existing content
  
    workShifts.forEach(shift => {
      const card = document.createElement('div');
      card.classList.add('card', 'my-4');
  
      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');
      cardHeader.innerText = formatDateTime(shift.start_time);
      card.appendChild(cardHeader);
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const table = document.createElement('table');
      table.classList.add('table');  // Bootstrap class
      const tbody = document.createElement('tbody');
  
      const fields = [
        { label: 'Start Time', key: 'start_time' },
        { label: 'End Time', key: 'end_time' },
        { label: 'Duration', key: 'duration' },
        { label: 'Is Claimed', key: 'is_claimed' },
        { label: 'Expiration Date', key: 'expiration_date' },
      ];
  
      fields.forEach(field => {
        const row = document.createElement('tr');
  
        const labelCell = document.createElement('td');
        labelCell.innerText = field.label;
        labelCell.style.fontWeight = 'bold';
        row.appendChild(labelCell);
  
        const dataCell = document.createElement('td');
  
        if (field.key === 'start_time' || field.key === 'end_time' || field.key === 'expiration_date') {
          dataCell.innerText = formatDateTime(shift[field.key]);
        } else if (field.key === 'duration') {
          dataCell.innerText = formatDuration(shift[field.key]);
        } else {
          dataCell.innerText = shift[field.key];
        }
  
        row.appendChild(dataCell);
        tbody.appendChild(row);
      });
  
      table.appendChild(tbody);
      cardBody.appendChild(table);
      card.appendChild(cardBody);
  
      workShiftList.appendChild(card);
    });
  }
  