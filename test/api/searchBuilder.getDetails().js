describe('searchBuilder - API - searchBuilder.getDetails()', function() {
	let table;
	let res;

	dt.libs({
		js: ['jquery', 'datatables', 'searchbuilder', 'datetime'],
		css: ['datatables', 'searchbuilder', 'datetime']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Exists and is a function', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip'
			});
			expect(typeof table.searchBuilder.getDetails).toBe('function');
		});
		it('Getter returns data source property', function() {
			expect(typeof table.searchBuilder.getDetails()).toBe('object');
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('No search present', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip'
			});

			res = table.searchBuilder.getDetails();

			expect(JSON.stringify(res)).toBe(JSON.stringify({}));
		});
		it('Partial search', function() {
			$('.dtsb-add').click();

			$('.dtsb-data').val(2);
			$('.dtsb-data').trigger('input');

			res = table.searchBuilder.getDetails();

			expect(JSON.stringify(res)).toBe(
				JSON.stringify({ criteria: [{ data: 'Office', value: [] }], logic: 'AND' })
			);
		});
		it('Full search', function() {
			$('.dtsb-condition').val('=');
			$('.dtsb-condition').trigger('input');

			$('.dtsb-value').val('San Francisco');
			$('.dtsb-value').trigger('input');

			res = table.searchBuilder.getDetails();

			expect(JSON.stringify(res)).toBe(
				JSON.stringify({
					criteria: [{ condition: '=', data: 'Office', value: ['San Francisco'] }],
					logic: 'AND'
				})
			);
		});
		it('Second condition', function() {
			$('.dtsb-add').click();

			$('.dtsb-data:eq(1)').val(3);
			$('.dtsb-data:eq(1)').trigger('input');

			$('.dtsb-condition:eq(1)').val('>');
			$('.dtsb-condition:eq(1)').trigger('input');

			$('.dtsb-value:eq(1)').val('61');
			$('.dtsb-value:eq(1)').trigger('input');


			res = table.searchBuilder.getDetails();

			expect(JSON.stringify(res)).toBe(
				JSON.stringify({
					criteria: [
						{ condition: '=', data: 'Office', value: ['San Francisco'] },
						{ condition: '>', data: 'Age', value: ['61'] }
					],
					logic: 'AND'
				})
			);
		});
	});
});
