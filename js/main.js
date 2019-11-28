$(function(){
  let $skillName = $("#skill-name");
  let $skillsEl = $("#skills");

  let allSkills;
  if (localStorage.getItem("skills") !== null) {
    allSkills = localStorage.getItem("skills").split(",");
  } else {
    console.log("no skills");
    allSkills = [];
  }

  for (skill of allSkills) {
    let $newSkill = $(`<li>
      <button class="remove-skill" type="button" name="button">X</button>
      <span class="skill">${skill}</span>
    </li>`);
    $skillsEl.append($newSkill);
  }

  $("#skills").on("click", ".remove-skill", removeSkill);

  $("#add-skill").on("click", (e) => {
    let newSkillName = $skillName.val(); // clean before inserting?
    let $newSkill = $(
      `<li>
        <button class="remove-skill" type="button" name="button">X</button>
        <span class="skill">${newSkillName}</span>
      </li>`);

    allSkills.push(newSkillName);
    localStorage.setItem("skills", allSkills);
    $skillsEl.append($newSkill);
  });

  function removeSkill(e) {
    $parentLi = $(this).closest("li");
    let indexToRemove = $parentLi.closest("ul").children().index($parentLi);
    allSkills.splice(indexToRemove, 1);
    $parentLi.fadeOut(300, function() {
      $(this).remove();
    });
    localStorage.setItem("skills", allSkills);
  }
});
