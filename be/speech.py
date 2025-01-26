import os, threading
import pyttsx3

def say(text):
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