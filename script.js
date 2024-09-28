        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyB4IIHXY7DJOnhGpZ7sni76ZU-cCleuohA",
            authDomain: "mit-soc.firebaseapp.com",
            databaseURL: "https://mit-soc-default-rtdb.firebaseio.com",
            projectId: "mit-soc",
            storageBucket: "mit-soc.appspot.com ",
            messagingSenderId: "543724803126",
            appId: "1:543724803126:web:0f99f3a09abac2eadeb497",
            measurementId: "G-E3KTEH64M2"
          };
          
                  // Initialize Firebase
              firebase.initializeApp(firebaseConfig);
          
              document.addEventListener('DOMContentLoaded', function () {
            const userEmail = localStorage.getItem('userEmail');  
            if (!userEmail) {
                console.error("User email not found in local storage");
                return;
            }
        
            const userEmailKey = userEmail.split('@')[0];  
            const dbRef = firebase.database().ref('students/' + userEmailKey);
        
            dbRef.once('value').then((snapshot) => {
                const data = snapshot.val();
                console.log("Data retrieved from Firebase:", data); // Debugging statement
        
                if (data) {
                    // Populate Academic Information
                    document.querySelector('#academic td:nth-child(2)').innerText = data.enrollmentId || 'N/A';
                    document.querySelector('#academic tr:nth-child(2) td:nth-child(2)').innerText = data.rollNumber || 'N/A';
                    document.querySelector('#academic tr:nth-child(3) td:nth-child(2)').innerText = data.year || 'N/A';
                    document.querySelector('#academic tr:nth-child(4) td:nth-child(2)').innerText = data.division || 'N/A';
                    document.querySelector('#academic tr:nth-child(5) td:nth-child(2)').innerText = data.language || 'N/A';
                    document.querySelector('#academic tr:nth-child(6) td:nth-child(2)').innerText = data.mdSubject || 'N/A';
        
                    // Populate Personal Information
                    console.log("Student name from Firebase:", data.studentName); // Debugging statement
                    document.querySelector('#studentName').innerText = data.studentName || '';
                   // document.querySelector('#personal input[name="studentName"]').value = data.studentName || '';
                    document.querySelector('#personal input[name="dateOfBirth"]').value = data.dateOfBirth || '';
                    document.querySelector('#personal input[name="address"]').value = data.address || '';
                    document.querySelector('#personal tr:nth-child(1) td:nth-child(2) input').value = data.studentName || '';
                    document.querySelector('#personal input[name="phone"]').value = data.phone || '';
                    document.querySelector('#personal input[name="fatherName"]').value = data.fatherName || '';
                    document.querySelector('#personal input[name="motherName"]').value = data.motherName || '';
                    document.querySelector('#personal input[name="fatherOccupation"]').value = data.fatherOccupation || '';
                    document.querySelector('#personal input[name="motherOccupation"]').value = data.motherOccupation || '';
                    document.querySelector('#personal input[name="parentPhone"]').value = data.parentPhone || '';
                    document.querySelector('#personal input[name="studentName"]').disabled = false;
        
                } else {
                    console.error("No data found for user in Firebase");
                }
            }).catch((error) => {
                console.error("Error fetching data from Firebase:", error);
            });
        });
          
                function showSection(sectionId) {
                    // Hide all sections
                    var sections = document.querySelectorAll('.section');
                    sections.forEach(function(section) {
                        section.classList.remove('active');
                    });
        
                    // Show the selected section with smooth transition
                    var targetSection = document.getElementById(sectionId);
                    targetSection.classList.add('active');
                }
        
                function toggleEdit() {
            const editIcon = document.querySelector('.edit-icon');
            const saveIcon = document.querySelector('.save-icon');
            const inputs = document.querySelectorAll('#personal input');
        
            editIcon.style.display = 'none';
            saveIcon.style.display = 'block';
        
            inputs.forEach(input => {
                input.disabled = !input.disabled; // Toggle disabled state
            });
        }
        
        function saveChanges() {
            const editIcon = document.querySelector('.edit-icon');
            const saveIcon = document.querySelector('.save-icon');
            const inputs = document.querySelectorAll('#personal input');
        
            const updatedData = {};
        
            inputs.forEach(input => {
                updatedData[input.name] = input.value;
            });
        
            console.log("Saving changes with data:", updatedData); // Debugging line
        
            const userEmailKey = localStorage.getItem('userEmail').split('@')[0];
            const dbRef = firebase.database().ref('students/' + userEmailKey);
        
            dbRef.update(updatedData)
                .then(() => {
                    console.log("Data updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating data:", error);
                });
        
            editIcon.style.display = 'block';
            saveIcon.style.display = 'none';
        
            inputs.forEach(input => {
                input.disabled = true; // Disable inputs after saving
            });
        }
        
        function toggleEdit() {
            const editIcon = document.querySelector('.edit-icon');
            const saveIcon = document.querySelector('.save-icon');
            const inputs = document.querySelectorAll('#personal input');
        
            editIcon.style.display = 'none';
            saveIcon.style.display = 'block';
        
            inputs.forEach(input => {
                input.disabled = false; // Enable inputs for editing
            });
        }
        
        document.addEventListener('DOMContentLoaded', function () {
            const userEmail = localStorage.getItem('userEmail');  
            if (!userEmail) {
                console.error("User email not found in local storage");
                return;
            }
        
            const userEmailKey = userEmail.split('@')[0];  
            const dbRef = firebase.database().ref('students/' + userEmailKey);
        
            dbRef.once('value').then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Populate Academic Information
                    document.querySelector('#academic td:nth-child(2)').innerText = data.enrollmentId || 'N/A';
                    document.querySelector('#academic tr:nth-child(2) td:nth-child(2)').innerText = data.rollNumber || 'N/A';
                    document.querySelector('#academic tr:nth-child(3) td:nth-child(2)').innerText = data.year || 'N/A';
                    document.querySelector('#academic tr:nth-child(4) td:nth-child(2)').innerText = data.division || 'N/A';
                    document.querySelector('#academic tr:nth-child(5) td:nth-child(2)').innerText = data.language || 'N/A';
                    document.querySelector('#academic tr:nth-child(6) td:nth-child(2)').innerText = data.mdSubject || 'N/A';
        
                    // Populate Personal Information
                    document.querySelector('#personal input[name="studentName"]').value = data.studentName || '';
                    document.querySelector('#personal input[name="dateOfBirth"]').value = data.dateOfBirth || '';
                    document.querySelector('#personal input[name="address"]').value = data.address || '';
                    document.querySelector('#personal td:nth-child(2)').innerText = data.email || 'N/A'; // Non-editable
                    document.querySelector('#personal input[name="phone"]').value = data.phone || '';
                    document.querySelector('#personal input[name="fatherName"]').value = data.fatherName || '';
                    document.querySelector('#personal input[name="motherName"]').value = data.motherName || '';
                    document.querySelector('#personal input[name="fatherOccupation"]').value = data.fatherOccupation || '';
                    document.querySelector('#personal input[name="motherOccupation"]').value = data.motherOccupation || '';
                    document.querySelector('#personal input[name="parentPhone"]').value = data.parentPhone || '';
                    
        
                } else {
                    console.error("No data found for user in Firebase");
                }
            }).catch((error) => {
                console.error("Error fetching data from Firebase:", error);
            });
        });
        
        function showSection(sectionId) {
            // Hide all sections
            var sections = document.querySelectorAll('.section');
            sections.forEach(function(section) {
                section.classList.remove('active');
            });
        
            // Show the selected section with smooth transition
            var targetSection = document.getElementById(sectionId);
            targetSection.classList.add('active');
        }