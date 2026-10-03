document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#cform");

  
  if (!form) return;
  form.noValidate = true;
const programSelect = form.querySelector("#program");
const branchSelect = form.querySelector("#branch");

if (programSelect && branchSelect) {
  const branches = {
    "B.Tech": [
      "Computer Science and Engineering (CSE)",
      "CSE - Artificial Intelligence and Machine Learning",
      "CSE - Data Science",
      "Information Technology (IT)",
      "Electronics and Communication Engineering (ECE)",
      "Electrical Engineering (EE)",
      "Mechanical Engineering (ME)",
      "Civil Engineering (CE)"
    ],

    "M.Tech": [
      "Computer Science and Engineering",
      "Artificial Intelligence",
      "Thermal Engineering"
    ],

    "MBA": [
      "Marketing",
      "Finance",
      "Human Resource Management",
      "International Business",
      "Business Analytics",
      "Operations Management"
    ],

    "MCA": [
      "Computer Applications",
      "Software Development",
      "Data Science"
    ],

    "B.Pharm": [
      "Pharmaceutics",
      "Pharmacology",
      "Pharmaceutical Chemistry",
      "Pharmacognosy"
    ]
  };

  
  const dobInput = form.querySelector("#dob");
  
  if (dobInput) {
    dobInput.max = "2006-12-31";
  
    dobInput.addEventListener("change", () => {
      if (dobInput.value > dobInput.max) {
        dobInput.setCustomValidity(
          "Date of birth must be on or before 31 December 2006."
        );
      } else {
        dobInput.setCustomValidity("");
      }
    });
  }
  

  programSelect.addEventListener("change", () => {
    const selectedProgram = programSelect.value;
    const options = branches[selectedProgram] || [];

    branchSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = options.length
      ? "Select Branch / Specialization"
      : "No branches available";

    branchSelect.appendChild(placeholder);
    branchSelect.disabled = options.length === 0;

    options.forEach(branch => {
      const option = document.createElement("option");
      option.value = branch;
      option.textContent = branch;
      branchSelect.appendChild(option);
    });
  });
}

  const steps = Array.from(form.querySelectorAll(":scope > fieldset"));
  if (!steps.length) return;

  let currentStep = 0;

  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) return;

  const submitOriginalText = submitButton.textContent.trim();

  // Progress bars
  const progress = document.createElement("div");
  progress.className = "progress";
  progress.setAttribute("aria-label", "Registration progress");

  const bars = steps.map(() => {
    const bar = document.createElement("span");
    progress.appendChild(bar);
    return bar;
  });

  // Section heading
  const heading = document.createElement("h3");
  heading.className = "step-title";
  heading.setAttribute("aria-live", "polite");

  // Step number
  const count = document.createElement("p");
  count.className = "step-count";

  // Navigation buttons
  const actions = document.createElement("div");
  actions.className = "actions";

  const back = document.createElement("button");
  back.type = "button";
  back.className = "back";
  back.textContent = "← Back";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "next";
  next.textContent = "Next →";

  actions.append(back, next, submitButton);

  // Insert the progress and heading at the top
  const firstFieldset = steps[0];

  form.insertBefore(progress, firstFieldset);
  form.insertBefore(heading, firstFieldset);
  form.insertBefore(count, firstFieldset);

  // Put Back, Next and Submit in the same button row
  form.appendChild(actions);

  function showStep(index) {
    currentStep = index;

    steps.forEach((step, i) => {
      step.hidden = i !== currentStep;

      bars[i].classList.toggle("active", i === currentStep);
      bars[i].classList.toggle("completed", i < currentStep);
    });

    heading.textContent =
      steps[currentStep].querySelector("legend")?.textContent ||
      `Step ${currentStep + 1}`;

    count.textContent = `Step ${currentStep + 1} of ${steps.length}`;

    back.disabled = currentStep === 0;

    const isLast = currentStep === steps.length - 1;

    next.hidden = isLast;
    submitButton.hidden = !isLast;
    submitButton.textContent = submitOriginalText || "Submit Application";

    heading.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function validateCurrentStep() {
    const fields = steps[currentStep].querySelectorAll(
      "input, select, textarea"
    );

    for (const field of fields) {
      if (field.disabled) continue;

      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }

    return true;
  }

  next.addEventListener("click", () => {
    if (!validateCurrentStep()) return;

    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
    }
  });

  back.addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });

  // Enter moves to the next step, except inside textareas
  form.addEventListener("keydown", event => {
    if (
      event.key === "Enter" &&
      event.target.tagName !== "TEXTAREA" &&
      currentStep < steps.length - 1
    ) {
      event.preventDefault();
      next.click();
    }
  });

  // Validate all steps before the existing submit handler runs

  
  form.addEventListener("submit", event => {
    event.preventDefault();
  
    for (let i = 0; i < steps.length; i++) {
      const invalid = Array.from(
        steps[i].querySelectorAll("input, select, textarea")
      ).find(field => !field.disabled && !field.checkValidity());
    
      if (invalid) {
        showStep(i);
      
        // Wait until the invalid field's step is visible
        requestAnimationFrame(() => {
          invalid.reportValidity();
          invalid.focus();
        });
      
        return;
      }
    }
  
    // All fields passed validation
    alert(
      "Application submitted successfully!\n\n" +
      "Note: This is a demo. Your application has not been saved to a server."
    );
  
  }, true);
  

  showStep(0);
});

