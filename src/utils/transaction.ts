// constructor(
//     // inject data source
//     private dataSource: DataSource
//   ) {}
  
//   @Post()
//   async routeHandler() {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     try {
//       await queryRunner.manager.save(Order, {
//         /* order data */
//       });
//       await queryRunner.manager.save(Item, {
//         /* item data */
//       });
//       await queryRunner.commitTransaction();
//     } catch (e) {
//       await queryRunner.rollbackTransaction();
//       throw e;
//     } finally {
//       await queryRunner.release();
//     }
    
//     // ...
//   }