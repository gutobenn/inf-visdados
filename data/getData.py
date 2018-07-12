import csv, sys
from collections import Counter


input_stream = open(sys.argv[1])
reader = csv.reader(input_stream, delimiter=';')

print(reader.next()) #skip header
data = [row[int(sys.argv[2])] for row in reader]
print data

for (k,v) in Counter(data).iteritems():
    print "%s %d" % (k, v)
