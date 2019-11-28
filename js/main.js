$(function(){
  let $skillName = $("#skill-name");
  let $skillsEl = $("#skills");

  let allSkills;
  if (localStorage.getItem("skills")) {
    allSkills = JSON.parse(localStorage.getItem("skills"));
  } else {
    allSkills = [];
  }

  for (skill of allSkills) {
    let $newSkill = $(`<li>
      <button class="remove-skill" type="button" name="button">X</button>
      <span class="skill">${skill}</span>
    </li>`);
    $skillsEl.append($newSkill);
  }

  // remove skill
  $("#skills").on("click", ".remove-skill", removeSkill);

  // add skill on button press or enter key press
  $("#add-skill").on("click", addSkill);

  $skillName.on("keypress", (e) => {
    if (e.which === 13) addSkill();
  });

  function addSkill() {
    let newSkillName = $skillName.val(); // clean before inserting?

    let $newSkill = $(
      `<li>
        <button class="remove-skill" type="button" name="button">X</button>
        <span class="skill">${newSkillName}</span>
      </li>`);

    allSkills.push(newSkillName);
    localStorage.setItem("skills", JSON.stringify(allSkills));
    $skillsEl.append($newSkill);
    $skillName.val("");
  }

  function removeSkill() {
    $parentLi = $(this).closest("li");
    let indexToRemove = $parentLi.closest("ul").children().index($parentLi);
    allSkills.splice(indexToRemove, 1);
    $parentLi.fadeOut(300, function() {
      $(this).remove();
    });
    localStorage.setItem("skills", JSON.stringify(allSkills));
  }
});
