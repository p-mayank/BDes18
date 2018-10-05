import os

def generate_html(name, ct, dirt):
	file_name = name+str(ct)+'.html'
	# file = open(file_name, 'w')
	# file.write()

def generate_pages(name, roll_number, dirt):
	cwd = os.getcwd()
	newpath = os.path.join(cwd, dirt)
	ct=0
	all_files = os.listdir(newpath)
	for filename in all_files:
		filename_s = filename.split('.')
		if(len(filename_s)==1):
			newsubpath = os.path.join(newpath, filename_s[0])
			generate_html(name, ct, newsubpath)
			ct+=1

def main_index():
	all_files = os.listdir()
	for filename in all_files:
		filename_s = filename.split('_')
		if(len(filename_s)!=2):
			continue
		name = filename_s[0]
		roll_number = filename_s[1]
		generate_pages(name, roll_number, filename)

def main():
	main_index()

if __name__ == '__main__':
	main()