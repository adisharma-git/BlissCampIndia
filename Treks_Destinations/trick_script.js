let tours = []; // Declare a global variable to hold the tours data

function populateTours(data) {
  const tourGrid = document.getElementById("tourGrid");
  tourGrid.innerHTML = ""; // Clear previous content

  if (data.length === 0) {
    // Show a message when no results are found
    tourGrid.innerHTML = `
        <div class="no-results">
          <p>No tours found matching your search criteria. Please try different filters or keywords.</p>
        </div>`;
    document.getElementById("resultsCount").textContent = 0; // Update results count
    return; // Exit the function early
  }

  data.forEach((tour) => {
    const card = `
              <div class="trek-card">
                <img src="${tour.image}" alt="${
      tour.title
    }" class="trek-image" />
                <div class="price-badge">₹${tour.price.toLocaleString()}</div>
                <div class="trek-details">
                  <h3 class="trek-title">${tour.title}</h3>
                  <p class="trek-duration">${tour.duration.days} DAYS - ${
      tour.duration.nights
    } NIGHTS</p>
                  <p class="trek-description">
                    ${tour.description}
                  </p>
                  <div class="DestMonth">
                      <p class="trek-destination">
                          <i class="fas fa-map-marker-alt"></i>&emsp;${
                            tour.destination
                          }
                      </p>
                      <p class="trek-month">
                          <i class="fas fa-calendar-alt"></i>&emsp;${tour.month}
                      </p>
                  </div>
                  <div class="Sea">
                      <p class="trek-season">
                          <i class="fas fa-cloud-sun"></i>&ensp;${tour.season}
                      </p>
                  </div>
                  <div class="trek-footer">
                    <div class="trek-rating">${"⭐".repeat(tour.rating)}</div>
                    <button class="trek-btn">Read More</button>
                  </div>
                </div>
              </div>
            `;
    tourGrid.innerHTML += card; // Append new card to the grid
  });
  document.getElementById("resultsCount").textContent = data.length; // Update results count
}

function filterTours() {
  const keyword = document.getElementById("searchKeyword").value.toLowerCase();
  const type = document.getElementById("tourType").value;
  const destination = document.getElementById("destinationFilter").value;
  const month = document.getElementById("monthFilter").value;
  const season = document.getElementById("seasonFilter").value; // Get the selected season

  const filtered = tours.filter((tour) => {
    return (
      (keyword === "" || tour.title.toLowerCase().includes(keyword)) &&
      (type === "" || tour.type === type) &&
      (destination === "" || tour.destination === destination) &&
      (month === "" || tour.month === month) &&
      (season === "" || tour.season === season) // Filter by season
    );
  });

  populateTours(filtered); // Populate the filtered tours
}

function sortTours() {
  const sortOption = document.getElementById("sortOptions").value;
  let sortedTours;

  if (sortOption === "priceLow") {
    sortedTours = [...tours].sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHigh") {
    sortedTours = [...tours].sort((a, b) => b.price - a.price);
  } else {
    sortedTours = [...tours]; // No sorting, retain default
  }

  populateTours(sortedTours); // Populate the sorted tours
}

// Fetch tours data
fetch("./tours.json")
  .then((response) => response.json())
  .then((data) => {
    tours = data; // Store the fetched data in the global tours variable
    populateTours(tours); // Populate the tours on initial load

    // Add event listeners for filtering and sorting
    document
      .getElementById("searchKeyword")
      .addEventListener("input", filterTours);
    document.getElementById("tourType").addEventListener("change", filterTours);
    document
      .getElementById("destinationFilter")
      .addEventListener("change", filterTours);
    document
      .getElementById("monthFilter")
      .addEventListener("change", filterTours);
    document
      .getElementById("seasonFilter") // Add event listener for season filter
      .addEventListener("change", filterTours);
    document
      .getElementById("sortOptions")
      .addEventListener("change", sortTours);
  })
  .catch((error) => console.error("Error loading tours:", error));