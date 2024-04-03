import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../supabase_func')
import supabase_func


def num_words_in_description(supafunc, name, filename):
    '''
    Get the number of words in each shelter's description written to a text file
      -  num_words_in_description(supabase_func.get_all_shelters, 'name', 'shelter_descriptions')
      -  num_words_in_description(supabase_func.get_all_events, 'title', 'event_descriptions')
    '''
    MAX_CHARS_PER_LINE = sys.maxsize
    instances = supafunc()  # get all instances for the given model
    res = [(instance[name], instance['description'], instance['id']) for instance in instances]
    res.sort(key=lambda x: len(x[1]), reverse=True)
    with open(f'./textfiles/{filename}.txt', 'w') as file:
        for d in res:
            num_words = str(d[1].count(' ') + 1)  # convert to str
            file.write(num_words + '\t id:' + str(d[2]) + '\t' + d[0] + '\n')
            description = d[1]
            while len(description) > 0:
                file.write(description[:MAX_CHARS_PER_LINE] + '\n')
                description = description[MAX_CHARS_PER_LINE:]
            file.write('----------------\n')


def clean_shelters():
    '''
    clean field entries for shelter model instances
    '''
    num_words_in_description(supabase_func.get_all_events, 'title', 'event_descriptions')


if __name__ == "__main__":
    pass