#include <stdio.h>
#include <stdlib.h>
#include <unistd.h> //Header file for sleep(). man 3 sleep for details.
#include <pthread.h>

int a = 0;

// A normal C function that is executed as a thread
// when its name is specified in pthread_create()

void *myThreadFun(void *vargp)
{
  int b;
  for (int i = 0; i < 100000; i++)
  {
    b = a;
    b = b + 1;
    a = b;
    printf("%d in thread %d \n", i, a);
  }
  return NULL;
}

int main()
{
  int b;
  pthread_t thread_id;
  pthread_t thread_id2;

  printf("Before Thread\n");

  pthread_create(&thread_id, NULL, myThreadFun, NULL);
  pthread_create(&thread_id2, NULL, myThreadFun, NULL);

  for (int i = 0; i < 100000; i++)
  {
    b = a;
    b = b + 1;
    a = b;
    printf("%d in main thread %d \n", i, a);
  }
  //printf("%d", a);

  pthread_join(thread_id, NULL);
  pthread_join(thread_id2, NULL);
  printf("%d\n", a);
  printf("After Thread\n");
  return 0;
}
// CLI运行指令
// windows
// gcc thread.c -l pthread -o thread.exe
// mac
// gcc thread.c -l pthread -o thread.out
// open the file
// ./thread.out
