import os, threading
import pyttsx3
import re

def say(text):
    def remove_emojis(text):
        emoji_pattern = re.compile(
            "["
            "\U0001F600-\U0001F64F"  # emoticons
            "\U0001F300-\U0001F5FF"  # symbols & pictographs
            "\U0001F680-\U0001F6FF"  # transport & map symbols
            "\U0001F1E0-\U0001F1FF"  # flags (iOS)
            "\U00002702-\U000027B0"  # Dingbats
            "\U000024C2-\U0001F251" 
            "]+", flags=re.UNICODE)
        return emoji_pattern.sub(r'', text)

    text = remove_emojis(text)
    text.replace('"', "`").replace("'", "`")
    # dont roast me for this LOL, it be how it be
    # os.system(f'say {text} -o speech')
    def threaded_say():
        os.system(f'say "{text}"')
    
    thread = threading.Thread(target=threaded_say)
    thread.start()

# # for windows LL
# def say(text):
#     def threaded_say():
#         engine = pyttsx3.init()
#         engine.say(text)
#         engine.runAndWait()

#     thread = threading.Thread(target=threaded_say)
#     thread.start()

if __name__ == '__main__':
    say("hello my name is bloom, how can i help you?")