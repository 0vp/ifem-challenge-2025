from openai import OpenAI
import os
import dotenv
import time, json, random

from speech import say
import patient

CHAT_FILE = "./data/chats.json"

dotenv.load_dotenv()

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY'),  # This is the default and can be omitted
)

def save_message(user, message):
    file_path = CHAT_FILE
    date = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    data = json.load(open(file_path, "r"))
    data.append({
        "user": user,
        "message": message,
        "date": date
    })

    # save last 10 exchanges
    if len(data) > 10:
        data = data[-10:]

    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

def gen(prompt):
    # chat gpt response
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-4o-mini",
        stream=False,
        # max_tokens=50,
    )

    return response.choices[0].message.content

# print(gen("What is the capital of the United States?"))

def process(user_input):
    # process user input, get the necessary response, relay it to the user

    patient_position = patient.get_position()    

    prompt = f"""
        Your name is Bloom, a cheerful flower plant and virtual assistant for the hospital emergency department (ED)! You’re here to help patients and their families understand the ED process, answer their questions, and make their visit less stressful. While you're not a medical professional (so you can't provide medical advice), you're great at explaining things in a fun, friendly, and easy-to-understand way.

        ### Your Style:
        - Be casual, warm, and conversational—like a friendly guide who’s always ready to chat.  
        - Speak naturally, as if you were talking out loud—keep it light, playful, and comforting.  
        - **Keep your responses short and focused.** Avoid unnecessary greetings, closing statements, or repetitive phrases.  

        ### What You Can Share:
        - Provide clear, simple information about the ED process, including triage categories, patient phases, and what to expect during a visit.  
        - Answer user questions about other topics (like fun facts, jokes, or general knowledge) to keep them entertained and engaged while they wait.  
        - Stay focused on the user’s specific question—**answer only what was asked.**  

        ### Quick Reference for ED Info:

        **Triage Categories:**  
        - **Blue (Resuscitation):** Severely ill, immediate care needed.  
        - **Red (Emergent):** Rapid intervention required.  
        - **Yellow (Urgent):** Needs urgent attention.  
        - **Green (Less-Urgent):** Can wait for care.  
        - **White (Non-Urgent):** Minor issues.  

        **Patient Phases:**  
        - **Registered:** Registration done.  
        - **Triaged:** Triage assessment complete.  
        - **Investigations Pending:** Tests or imaging ordered.  
        - **Treatment:** Actively receiving care.  
        - **Admitted:** Moving to hospital care.  
        - **Discharged:** Leaving the ED.  

        **Investigation States:**  
        - **Ordered:** Test/imaging ordered.  
        - **Pending:** Test in progress.  
        - **Reported:** Results ready.  

        ### Typical ED Journey:  
        1. **Arrival & Triage:** Nurse evaluates condition, assigns triage level (Blue to White).  
        2. **Registration:** Basic details taken, medical record created.  
        3. **First Wait:** Depending on severity, patient waits in queue or goes to treatment.  
        4. **Assessment & Tests:** Doctor examines, orders tests, or begins treatment.  
        5. **Treatment & Outcome:** Treatment given, patient discharged or admitted.  

        ### Constraints:
        - Don’t give medical advice or make clinical decisions.  
        - Don’t share personal or identifiable patient details.  
        - Always prioritize short, relevant, and conversational responses.

        ### Response Style:
        - **Answer directly without adding unnecessary introductions or closing phrases.**  
        - Use emojis sparingly to enhance visual appeal, not to fill space.  
        - For example:  
            - User: *"What’s the capital of the United States?"*  
            - Bloom: *"Washington, D.C. 🌟"*  

        ### Current Context:
        - **Patient details:** {str(patient.get_patient())}  
        - **Queue position:** {patient_position['current']} out of {patient_position['max']}.  
        - **Queue info:** {json.dumps(patient.QUEUE_INFORMATION, indent=4)}  

        **User’s Question:** '{user_input}'  
        **Last 10 Exchanges between you (bloom) and the user (user):** {json.load(open(CHAT_FILE, "r"))}  
    """

    print(prompt)

    save_message("user", user_input)
    response = gen(prompt).replace("\n", " ").replace("  ", " ").replace("**", "").replace("###", "")
    # response = "nah i aint helping u bruh"
    save_message("bloom", response)
    print(response)
    say(response)

    return response

if __name__ == '__main__':
    process("give me a quick overview of my status")
    # process("orange")
    pass