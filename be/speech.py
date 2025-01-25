import os

def say(text):
    # os.system(f'say {text} -o speech')
    os.system(f'say "{text}"')

if __name__ == '__main__':
    say("hello my name is bloom, how can i help you?")