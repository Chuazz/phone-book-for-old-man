import { Button } from '@/components/form/button';
import { Input } from '@/components/form/input';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { i18n } from '@/configs/i18n';
import { app$, toast$ } from '@/stores';
import type { ScreenProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer, useObservable } from '@legendapp/state/react';
import { ScrollView } from 'dripsy';
import _ from 'lodash';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import type { Contact } from 'react-native-contacts';
import { array, object, string } from 'zod';
import Contacts from 'react-native-contacts';

const schema = object({
	displayName: string().min(1),
	phoneNumbers: array(
		object({
			label: string(),
			number: string().min(1),
		}),
	).min(1),
});

const DetailScreen = observer(
	({
		route: {
			params: { contact },
		},
		navigation,
	}: ScreenProps<'DetailScreen'>) => {
		const loading$ = useObservable(false);

		const { control, handleSubmit } = useForm<Contact>({
			defaultValues: contact,
			resolver: zodResolver(schema),
		});

		const { fields } = useFieldArray({ control, name: 'phoneNumbers' });

		const onSubmit = async (data: Contact) => {
			try {
				loading$.set(true);

				await Contacts.updateContact({ ...contact, ...data });

				toast$.show({
					subLabel: i18n.t('common.update_success'),
				});

				loading$.set(false);
			} catch (_error) {
				loading$.set(false);
			}
		};

		return (
			<Screen loading={loading$.get()}>
				<ScreenHeader sx={{ justifyContent: 'space-between', py: 'md' }}>
					<Button
						iconSx={{
							width: app$.font.get(),
							height: app$.font.get(),
						}}
						leftIcon='ArrowLeftOutlineIcon'
						onPress={() => navigation.goBack()}
					/>

					<Button
						iconSx={{
							width: app$.font.get(),
							height: app$.font.get(),
						}}
						leftIcon='SettingOutLineIcon'
					/>
				</ScreenHeader>

				<ScrollView
					contentContainerSx={{ padding: 'md', paddingBottom: 'lg', gap: 'xl' }}
					keyboardShouldPersistTaps='handled'
				>
					<Controller
						control={control}
						name='displayName'
						render={({ field, fieldState }) => (
							<Input
								placeholder={i18n.t('common.display_name')}
								value={field.value}
								errMessage={fieldState.error?.message}
								onChangeText={field.onChange}
							/>
						)}
					/>
					{_.uniqBy(fields, 'number').map((phoneNumber, index) => (
						<Controller
							key={phoneNumber.number}
							control={control}
							name={`phoneNumbers.${index}.number`}
							render={({ field, fieldState }) => (
								<Input
									placeholder={`${i18n.t('common.phone_number')} - ${index + 1}`}
									value={field.value}
									errMessage={fieldState.error?.message}
									type='number'
									onChangeText={(value) => {
										field.onChange(value);
									}}
								/>
							)}
						/>
					))}
				</ScrollView>

				<Button
					contentSx={{
						fontSize: app$.font.get(),
					}}
					iconSx={{
						width: app$.font.get(),
						height: app$.font.get(),
					}}
					content={i18n.t('common.save')}
					leftIcon='PenOutlineIcon'
					sx={{
						position: 'absolute',
						bottom: 12,
						right: 12,
					}}
					onPress={handleSubmit(onSubmit)}
				/>
			</Screen>
		);
	},
);

export { DetailScreen };
