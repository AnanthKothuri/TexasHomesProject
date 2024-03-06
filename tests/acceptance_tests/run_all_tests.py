import os

if __name__ == "__main__":
    # Use chromedriver based on OS
    # if platform == "win32":
    #     PATH = "./acceptance_tests/chromedriver.exe"
    # elif platform == "linux":
    #     PATH = "./acceptance_tests/chromedriver_linux"
    # else:
    #     print("Unsupported OS")
    #     exit(-1)

    # Run all of the gui tests
    os.system("python3 ./tests/acceptance_tests/test_navbar.py")
    os.system("python3 ./tests/acceptance_tests/test_model_pages.py")
    os.system("python3 ./tests/acceptance_tests/test_model_instances.py")
