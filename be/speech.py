import os

def say(text):
    # dont roast me for this LOL, it be how it be
    # os.system(f'say {text} -o speech')
    os.system(f'say "{text}"')

if __name__ == '__main__':
    say("hello my name is bloom, how can i help you?")