#!/usr/bin/python
import os
import os.path
import sys
import re

spaceReplaceList = ["\."]
removeList = ["720p", "1080p", "\(.*\)", "\[.*\]", "DVDRip.*", "20.*", "x264.*", "BluRay.*", "-FXG", "\(", "\)", "\[", "\]", "LiMiTED.*", "HDRip.*"]

os.chdir(sys.argv[1])
print "Current Dir: " + os.getcwd()

for movieDir in os.listdir(os.getcwd()):
    if (movieDir == "."):
        continue

    scrubbedMovieName = movieDir

    for patternToReplace in spaceReplaceList:
        scrubbedMovieName = re.sub(patternToReplace, " ", scrubbedMovieName, flags=re.IGNORECASE)

    for patternToRemove in removeList:
        scrubbedMovieName = re.sub(patternToRemove, "", scrubbedMovieName, flags=re.IGNORECASE)

    action = sys.argv[2]
    if (action == "scrub-rename"):
        if (scrubbedMovieName != movieDir):
            os.rename(movieDir, scrubbedMovieName)

    if (action == "scrub-list"):
        print scrubbedMovieName

