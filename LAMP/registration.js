var formValidated = false;
        var selectedTraits = ["", "", ""];
        const errorMessage = "That was an invalid username. Your username cannot be blank nor include the following characters: ” ! @ # % & * ( ) + = ˆ { } [ ] — ; : “ ’ < > ? /"; 
        let invalidCharacters = [
                "!",
                "@",
                "#",
                "%",
                "&",
                "*",
                "(",
                ")",
                "+",
                "=",
                "{",
                "}",
                "[",
                "]",
                "—",
                '"',
                "“",
                "”",
                "'",
                "’",
                "`",
                ";",
                ":",
                "<",
                ">",
                "?",
                "/"
                    ];
        
        self.document.getElementById("validateForm").addEventListener("click", function(){
            event.preventDefault();
            validateForm();
        });

        const buttonGroupPressed = e => {
            const isButton = e.target.nodeName === 'BUTTON';
            if(!isButton) {
                return false;
            }
            else{
                if(!formValidated){
                    var clickedObj = e.target;
                    let container = clickedObj.parentNode;
                    for(let i = 0; i < container.children.length; i++){
                        container.children[i].classList.remove("selected");
                    }
                    clickedObj.classList.add("selected");
                    pickTrait(clickedObj);
                }
            }
        }
        self.document.getElementById("eyesContainer").addEventListener("click", buttonGroupPressed);
        self.document.getElementById("mouthContainer").addEventListener("click", buttonGroupPressed);
        self.document.getElementById("skinContainer").addEventListener("click", buttonGroupPressed);

        function pickTrait(object){
            let traitFilePath = "/emoji_assets/";    //need to assign this to cookie
            var className = object.getAttribute("class");
            const traits = self.document.getElementsByClassName(className);
            switch(className.replace(" selected", "")){
                case "skin":
                    self.document.getElementById("skinLayer").src = traitFilePath + "skin/" + object.name;
                    selectedTraits[0] = object.name;
                    self.document.getElementsByName("skinInput")[0].value = object.name;
                    break;
                case "eyes":
                    self.document.getElementById("eyeLayer").src = traitFilePath + "eyes/" + object.name;
                    selectedTraits[1] = object.name;
                    self.document.getElementsByName("eyeInput")[0].value = object.name;
                    break;
                case "mouth":
                    self.document.getElementById("mouthLayer").src = traitFilePath + "mouth/" + object.name;
                    selectedTraits[2] = object.name;
                    self.document.getElementsByName("mouthInput")[0].value = object.name;
                    break;
            }
            for(let i = 0; i < traits.length; i++){
                if(traits[i].id != object.id){
                    traits[i].style.border = null;
                }
            }
        }

        function validateForm(){
            //validate username
            let username = self.document.getElementById("username").value;
            for(let i = 0; i < invalidCharacters.length; i++){
                if(username.includes(invalidCharacters[i]) || username.length == 0 || username.includes(" ")){
                    self.document.getElementById("errorMessage").textContent = errorMessage;
                    return false;
                }
            }
            //check they've selected emojis to create an avatar
            if(selectedTraits.includes("")){
                return false;
            }
            else{
            }
            //sign-up was valid, now need to post the data (use cookies for user)
            document.getElementById("validateForm").remove();
            document.getElementById("btnSubmit").hidden = false;
            document.getElementById("username").readonly = "readonly";
            formValidated = true;
            return true;
        }