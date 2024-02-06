
from nltk.corpus import stopwords
from algorithm import webSearch
import sys
import re

# Given a text string, remove all non-alphanumeric
# characters (using Unicode definition of alphanumeric).

def getQueries(text, n):
    sentenceEnders = re.compile("['.!?]")
    sentenceList = sentenceEnders.split(text)
    sentencesplits = []
    en_stops = set(stopwords.words('english'))

    for sentence in sentenceList:
        x = re.compile(r'\W+', re.UNICODE).split(sentence)
        for word in x:
            if word.lower() in en_stops:
                x.remove(word)
        x = [ele for ele in x if ele != '']
        sentencesplits.append(x)
    finalq = []
    for sentence in sentencesplits:
        l = len(sentence)
        if l > n:
            l = int(l/n)
            index = 0
            for i in range(0, l):
                finalq.append(sentence[index:index+n])
                index = index + n-1
                if index+n > l:
                    index = l-n-1
            if index != len(sentence):
                finalq.append(sentence[len(sentence)-index:len(sentence)])
        else:
            if l > 4:
                finalq.append(sentence)
    return finalq


# def findSimilarity(text):
#     # n-grams N VALUE SET HERE
#     n = 9
#     queries = getQueries(text, n)
#     print('GetQueries task complete')
#     q = [' '.join(d) for d in queries]
#     output = {}
#     c = {}
#     i = 1
#     while("" in q):
#         q.remove("")
#     count = len(q)
#     if count > 100:
#         count = 100
#     numqueries = count
#     plagiarized_text = ""  # Initialize an empty string to store plagiarized text
#     for s in q[0:count]:
#         output, c, errorCount = webSearch.searchWeb(s, output, c)
#         print('Web search task complete')
#         numqueries = numqueries - errorCount
#         # print(output,c)
#         sys.stdout.flush()
#         i = i+1
    
#         # Check if the query matches any text on the web
#         if errorCount == 0:
#             plagiarized_text += s + " "  # Append the query to plagiarized text if found on the web
        
#     totalPercent = 0
#     outputLink = {}
#     print(output, c)
#     prevlink = ''
#     for link in output:
#         percentage = (output[link]*c[link]*100)/numqueries
#         if percentage > 10:
#             totalPercent = totalPercent + percentage
#             prevlink = link
#             outputLink[link] = percentage
#         elif len(prevlink) != 0:
#             totalPercent = totalPercent + percentage
#             outputLink[prevlink] = outputLink[prevlink] + percentage
#         elif c[link] == 1:
#             totalPercent = totalPercent + percentage
#         print(link, totalPercent)

#     totalPercent = round(totalPercent,2)
#     print(count, numqueries)
#     print(totalPercent, outputLink)
#     print("\nDone!")
#     return totalPercent, outputLink, plagiarized_text


def findSimilarity(text):
    # n-grams N VALUE SET HERE
    n = 9
    queries = getQueries(text, n)
    print('GetQueries task complete')
    q = [' '.join(d) for d in queries]
    output = {}
    c = {}
    i = 1
    while("" in q):
        q.remove("")
    count = len(q)
    if count > 100:
        count = 100
    numqueries = count
    plagiarized_text = ""  # Initialize an empty string to store plagiarized text
    for s in q[0:count]:
        output, c, errorCount = webSearch.searchWeb(s, output, c)
        print('Web search task complete')
        numqueries = numqueries - errorCount
        sys.stdout.flush()
        i = i+1

        # Check if the query matches any text on the web
        if errorCount == 0:
            # Append the query to plagiarized text if found on the web
            plagiarized_text += s + " "

    # Calculate total percentage and output links
    totalPercent = 0
    outputLink = {}
    prevlink = ''
    for link in output:
        percentage = (output[link]*c[link]*100)/numqueries
        if percentage > 10:
            totalPercent = totalPercent + percentage
            prevlink = link
            outputLink[link] = percentage
        elif len(prevlink) != 0:
            totalPercent = totalPercent + percentage
            outputLink[prevlink] = outputLink[prevlink] + percentage
        elif c[link] == 1:
            totalPercent = totalPercent + percentage
        print(link, totalPercent)

    totalPercent = round(totalPercent,2)
    print(count, numqueries)
    print(totalPercent, outputLink)
    print("\nDone!")
    return totalPercent, outputLink, plagiarized_text